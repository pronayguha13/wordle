type UseGameValidatorProps = {
  word: string;
  targetWord: string;
};

export enum VALIDATION_CODE {
  "IN_POSITION",
  "NOT_IN_TARGET",
  "NOT_IN_POSITION",
  "NOT_VALIDATED",
}

export type ValidationWordMap = Array<{
  word: string;
  status: VALIDATION_CODE;
}>;

/**
 * @description  Hook to validate a string with another target string
 * @param {string} param0 word: Word that needs to be validated
 * @param { string } param1 targetWord: The word against which the word needs to be validated
 * @returns {ValidationWordMap}  validationStatus
 */
const validate = ({
  word,
  targetWord,
}: UseGameValidatorProps): {
  isFound: boolean;
  validationMap: ValidationWordMap;
} => {
  const validationWordMap = [];
  const matchedIndex: number[] = [];

  for (let index = 0; index < word.length; index++) {
    console.log(matchedIndex, word[index]);
    const lowerCasedWord = word[index].toLowerCase();

    let validationCode = VALIDATION_CODE.NOT_IN_TARGET;
    for (
      let iteratorIndex = 0;
      iteratorIndex < targetWord.length;
      iteratorIndex++
    ) {
      const char = targetWord[iteratorIndex];
      if (index === iteratorIndex && char === lowerCasedWord) {
        validationCode = VALIDATION_CODE.IN_POSITION;
        matchedIndex.push(iteratorIndex);
        break;
      } else if (
        !matchedIndex.includes(iteratorIndex) &&
        char === lowerCasedWord &&
        word[iteratorIndex] !== char
      ) {
        validationCode = VALIDATION_CODE.NOT_IN_POSITION;
        matchedIndex.push(iteratorIndex);
        break;
      }
    }

    validationWordMap.push({ word: word[index], status: validationCode });
  }

  let isNotSucceedPresent = false;

  validationWordMap.forEach((validationMap) => {
    if (
      (validationMap.status as VALIDATION_CODE) !== VALIDATION_CODE.IN_POSITION
    ) {
      isNotSucceedPresent = true;
      return;
    }
  });
  return { isFound: !isNotSucceedPresent, validationMap: validationWordMap };
};

export default validate;
