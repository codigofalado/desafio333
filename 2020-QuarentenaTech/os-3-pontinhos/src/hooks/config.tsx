import React, { createContext, useContext, useState, useMemo } from 'react';

export interface ConfigData {
  difficulty: number;
  formattedDifficulty: string;
  gridEnabled: boolean;
  phantomPieceEnabled: boolean;
}

interface Config {
  config: ConfigData;
  togglePhantomPiece(): void;
  toggleGrid(): void;
  increseDifficulty(): void;
  decreseDifficulty(): void;
  saveConfig(): void;
}

const DIFFICULTY = ['Facíl', 'Médio', 'Díficil'];

const ConfigContext = createContext<Config>({} as Config);

const ConfigProvider: React.FC = ({ children }) => {
  const [difficulty, setDifficulty] = useState(() => {
    const response = localStorage.getItem('@tetris333:config:difficulty');
    return response ? JSON.parse(response) : 1;
  });

  const [phantomPieceEnabled, setPhantomPieceEnabled] = useState(() => {
    const response = localStorage.getItem('@tetris333:config:phantomPiece');
    return response ? JSON.parse(response) : true;
  });

  const [gridEnabled, setGridEnabled] = useState(() => {
    const response = localStorage.getItem('@tetris333:config:grid');
    return response ? JSON.parse(response) : false;
  });

  const formattedDifficulty = useMemo(() => DIFFICULTY[difficulty], [
    difficulty,
  ]);

  function togglePhantomPiece(): void {
    setPhantomPieceEnabled(!phantomPieceEnabled);
  }

  function toggleGrid(): void {
    setGridEnabled(!gridEnabled);
  }

  function increseDifficulty(): void {
    if (difficulty < 2) {
      setDifficulty(difficulty + 1);
    }
  }

  function decreseDifficulty(): void {
    if (difficulty > 0) {
      setDifficulty(difficulty - 1);
    }
  }

  function saveConfig(): void {
    localStorage.setItem('@tetris333:config:grid', JSON.stringify(gridEnabled));

    localStorage.setItem(
      '@tetris333:config:difficulty',
      JSON.stringify(difficulty),
    );

    localStorage.setItem(
      '@tetris333:config:phantomPiece',
      JSON.stringify(phantomPieceEnabled),
    );
  }

  return (
    <ConfigContext.Provider
      value={{
        config: {
          difficulty,
          formattedDifficulty,
          gridEnabled,
          phantomPieceEnabled,
        },
        toggleGrid,
        togglePhantomPiece,
        increseDifficulty,
        decreseDifficulty,
        saveConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

function useConfig(): Config {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error('useConfig must be used within an ConfigProvider');
  }

  return context;
}

export { useConfig, ConfigProvider };
