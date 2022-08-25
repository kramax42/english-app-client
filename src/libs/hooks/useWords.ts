import useSWR from "swr";
import { WORDS_MODE } from "libs/constants/names.storage";
import { COMMON_WORDS_COUNT_URL, USER_WORDS_COUNT_URL } from "libs/constants/url";
import { useLocalStorage, useWordsApi } from "libs/hooks";
import { WordsMode } from "libs/types/types";
import { getWordsUrl } from "libs/helpers/get-words-url.helper";

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

    const { data: words, mutate, error } = useSWR(wordsUrl, api.getWords);
    const loading: boolean = !words && !error;

    const countUrl = mode == 'userWords' ? USER_WORDS_COUNT_URL : COMMON_WORDS_COUNT_URL;
    const { data: count, mutate: mutateCount, error: countError } = useSWR(countUrl, api.getWordsCount);
    const loadingCount = !count && !countError;

    return {
        loading,
        words: words ? words : [],
        mutate,
        loadingCount,
        count: count ? count : null,
        mutateCount,
    };
}

