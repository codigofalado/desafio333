import React, { FormEvent } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/Layout';
import { useConfig } from '../../hooks/config';

import * as S from './styles';

const Configuration: React.FC = () => {
  const {
    difficulty,
    gridEnabled,
    phantomPieceEnabled,
    toggleGrid,
    togglePhantomPiece,
    increseDifficulty,
    decreseDifficulty,
    saveConfig,
  } = useConfig();

  const history = useHistory();

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    saveConfig();

    history.push('/');
  }

  return (
    <Layout>
      <S.Container>
        <h1>Configuração</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="difficulty">
            Dificuldade inicial
            <div>
              <button type="button" onClick={decreseDifficulty}>
                <FaChevronLeft />
              </button>
              <input readOnly type="text" id="difficulty" value={difficulty} />
              <button type="button" onClick={increseDifficulty}>
                <FaChevronRight />
              </button>
            </div>
          </label>

          <label htmlFor="phantomPiece">
            Peça fantasma
            <input
              type="checkbox"
              id="phantomPiece"
              checked={phantomPieceEnabled}
              onChange={togglePhantomPiece}
            />
            <span />
          </label>

          <label htmlFor="grid">
            Grid
            <input
              type="checkbox"
              id="grid"
              checked={gridEnabled}
              onChange={toggleGrid}
            />
            <span />
          </label>

          <S.SubmitButton>Salvar</S.SubmitButton>
        </form>
      </S.Container>
    </Layout>
  );
};

export default Configuration;
