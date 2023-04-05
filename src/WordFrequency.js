/*
Uses a stop list and delimiting on punctuation
*/
function wordFrequency(text) {
  //Stop Words are words in a stoplist that are filtered out
  const stopWords = [
  "a", "able", "about", "across", "after", "all", "almost", "also", "am", "among",
  "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by",
  "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever",
  "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers",
  "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its",
  "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must",
  "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or",
  "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since",
  "so", "some", "than", "that", "the", "their", "them", "then", "there", "these",
  "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were",
  "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with",
  "would", "yet", "you", "your"
  ];
  //text.replace to fix firefox <br> tag error or just newLine characters in general
  //Remove all non-letter characters from input text
  //Also called a phrase delimiter(s), remove punctuation characters, and empty "" words
  const words = text.replace(/\n/g, ' ').split(/[^a-zA-Z]+/g);
  const frequency = {};
  for (let word of words) {
    if (!stopWords.includes(word.toLowerCase()) && !/\d/.test(word) && word !== "") {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  }

  //Find most frequent word
  let mostFrequentWord = "";
  let maxFrequency = 0;
  for (let word in frequency) {
    if (frequency[word] > maxFrequency) {
      mostFrequentWord = word;
      maxFrequency = frequency[word];
    }
  }
  return [ mostFrequentWord, frequency ];
}

export default wordFrequency;