const createKeywords = (field: string) => {
  const keywords: string[] = [];
  let keyword = "";
  field.split("").forEach((letter) => {
    keyword += letter;
    keywords.push(keyword);
  });

  return keywords;
};

export const generateKeywords = (field: string) => {
  const subfields = field.split(" ");

  const subfieldsKeywords = subfields.map((subfield) =>
    createKeywords(subfield)
  );

  const additionalKeywordsArray: string[][] = [];

  for (let i = 1; i < subfieldsKeywords.length; i++) {
    for (let j = 0; j < i; j++) {
      additionalKeywordsArray.push(
        subfieldsKeywords[i].map((keyword) => subfields[j] + " " + keyword)
      );
    }
  }

  let keywords: string[] = [];

  subfieldsKeywords.forEach((subfieldKeywords) => {
    keywords = keywords.concat(subfieldKeywords);
  });

  additionalKeywordsArray.forEach((additionalKeywords) => {
    keywords = keywords.concat(additionalKeywords);
  });

  return keywords;
};
