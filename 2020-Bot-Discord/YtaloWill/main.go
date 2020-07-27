package main

import (
	"io"
	"os"
	"fmt"
	"log"
	"syscall"
	"os/exec"
	"strconv"
	"net/http"
	"os/signal"
	"image/jpeg"
	"github.com/nfnt/resize"
	"github.com/joho/godotenv"
	"github.com/bwmarrin/discordgo"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil { log.Fatalf("Error loading .env file") }
	
	// Config Bot
	discord, err := discordgo.New("Bot " + os.Getenv("TOKEN"))
	if err != nil { log.Fatal(err) }
	
	discord.AddHandler(messageCreate)

	discord.Identify.Intents = discordgo.MakeIntent(discordgo.IntentsGuildMessages)

	err = discord.Open()
	if err != nil {
		fmt.Println("error opening connection,", err)
		return
	}
	defer discord.Close()

	// Wait here until CTRL-C or other term signal is received.
	fmt.Println("Bot is now running.  Press CTRL-C to exit.")
	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt, os.Kill)
	<-sc

}

func messageCreate(s *discordgo.Session, m *discordgo.MessageCreate) {

	if m.Author.ID == s.State.User.ID {
		return
	}

	if m.Content == "!distort" {
		if len(m.Attachments) > 0 {
			
			image := m.Attachments[0]
			
			err := downloadImage(image.Filename, image.URL)
			if err != nil { 
				sendError(s, m)
				return
			}

			if !isImage(image.Filename){ 
				sendError(s, m) 
				os.Remove(image.Filename)
				return 
			}

			caire, err := exec.LookPath("caire")
			if err != nil { 
				sendError(s, m) 
				return
			}

			newImage := "new" + image.Filename + ".jpeg"
			cmd := exec.Command(caire, 
								"-in", image.Filename,
								"-out", newImage,
								"-height", strconv.Itoa(image.Height/2),
								"-width", strconv.Itoa(image.Width/2))

			cmd.Run()
			
			resizeImage(newImage, image.Width, image.Height)

			sendImage(newImage, m, s)

			os.Remove(newImage)
			os.Remove(image.Filename)
		} else {
			s.ChannelMessageSend(m.ChannelID, "@" + m.Author.Username + "Eu preciso de uma imagem ;-;")
		}
	}
}

func downloadImage(output, url string) error {
	resp, err := http.Get(url)
	if err != nil { return err }
	defer resp.Body.Close()

	out, err := os.Create(output)
	if err != nil {	return err }
	defer out.Close()

	_, err = io.Copy(out, resp.Body)
	return err
}

func sendImage(filename string, m *discordgo.MessageCreate, s *discordgo.Session){
	file, err := os.Open(filename)
	if err != nil { return }

	defer file.Close()

	message := "@" + m.Author.Username + " aqui está a sua imagem, aproveite"

	s.ChannelFileSendWithMessage(m.ChannelID, message, filename, file)
}

func sendError(s *discordgo.Session, m *discordgo.MessageCreate){
	s.ChannelMessageSend(m.ChannelID, "@" + m.Author.Username + " não consegui abrir sua imagem :(")
}

func isImage(path string) bool{

	file, err := os.Open(path)
	if err != nil { return false }

	buff := make([]byte, 512) // http://golang.org/pkg/net/http/#DetectContentType
	_, err = file.Read(buff)
	if err != nil { return false }

	filetype := http.DetectContentType(buff)
	

	switch filetype {
		case "image/jpeg", 
			"image/jpg", 
			"image/gif", 
			"image/png":
				return true
	}
	return false
}

func resizeImage(pathImage string, width, height int){
	file, err := os.Open(pathImage)
	if err != nil { return }

	img, err := jpeg.Decode(file)
	if err != nil { return }
	file.Close()

	newImage := resize.Resize(uint(width), uint(height), img, resize.Lanczos3)

	out, err := os.Create(pathImage)
	if err != nil { return }
	defer out.Close()

	jpeg.Encode(out, newImage, nil)
}
