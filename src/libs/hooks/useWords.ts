import React from 'react';
import axios from 'axios';
import { WORDS_MODE } from 'libs/constants/names.storage';
import {
  COMMON_WORDS_COUNT_URL,
  COMMON_WORDS_URL,
  USER_WORDS_COUNT_URL,
  USER_WORDS_URL,
} from 'libs/constants/url';
import { getWordsUrl } from 'libs/helpers/get-words-url.helper';
import { useLocalStorage, useWordsApi } from 'libs/hooks';
import { WordsMode } from 'libs/types/types';
import useSWR from 'swr';

interface IUseWords {
  mode: 'commonWords' | 'userWords';
  skip?: number;
  limit?: number;
}

export const useWords = ({ mode, skip, limit }: IUseWords) => {
  const [wordsMode] = useLocalStorage<WordsMode>(WORDS_MODE, 'userWords');

  const { api } = useWordsApi(wordsMode);

  const wordsUrl = getWordsUrl({
    wordsMode,
    skip,
    limit,
  });

  const {
    data: words,
    mutate: mutateWords,
    error: wordsError,
  } = useSWR(wordsUrl, api.getWords);
  const loading: boolean = !words && !wordsError;

  const countUrl =
    mode == 'userWords' ? USER_WORDS_COUNT_URL : COMMON_WORDS_COUNT_URL;
  const {
    data: count,
    mutate: mutateCount,
    error: countError,
  } = useSWR(countUrl, api.getWordsCount);
  const loadingCount = !count && !countError;

  const fetcher = (url: string) =>
    axios.get(url, { withCredentials: true }).then(res => res.data as string[]);
  const { data: activeLetters, error: activeLettersError } = useSWR(
    `${
      wordsMode == 'userWords' ? USER_WORDS_URL : COMMON_WORDS_URL
    }/active-letters`,
    fetcher,
  );
  const isActiveLettersLoading =
    !(activeLetters || activeLetters == 0) && !activeLettersError;

  React.useEffect(() => {
    mutateCount();
  }, [words]);

  React.useEffect(() => {
    mutateWords();
  }, [count]);

  return {
    loading,
    words: words || [],
    mutateWords,
    loadingCount,
    count: count || null,
    mutateCount,
    activeLetters: activeLetters || [],
    isActiveLettersLoading,
  };
};
