FROM ubuntu:18.04

RUN apt-get update && \
apt-get install -y \
build-essential \
git \
wget

ENV GO_INSTALL_DIR="/usr/local/"
ENV PATH=$PATH:$GO_INSTALL_DIR/go/bin
ENV GOPATH="/workspace"
ENV GOBIN="/usr/local/go/bin"

RUN wget https://dl.google.com/go/go1.13.8.linux-amd64.tar.gz
RUN tar zxvf go1.13.8.linux-amd64.tar.gz -C $GO_INSTALL_DIR

ENV APP_HOME /workspace/src/project
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ADD . $APP_HOME

RUN rm /workspace/src/project/go.mod
RUN go get ./...

RUN rm -rf $GOPATH/src/esimov
RUN go get -u -f github.com/esimov/caire/cmd/caire
RUN go install $GOPATH/src/github.com/esimov/caire/cmd/caire

EXPOSE 5000

CMD ["go", "run", "main.go"]
