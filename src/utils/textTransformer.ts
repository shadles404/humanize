import { getRandomItem, shuffleArray, randomInRange } from './helpers';

// Vocabulary variations for common words
const vocabularyVariations = {
  important: ['crucial', 'essential', 'key', 'vital', 'significant'],
  believe: ['think', 'feel', 'reckon', 'guess', 'suppose'],
  beautiful: ['gorgeous', 'lovely', 'stunning', 'pretty', 'attractive'],
  interesting: ['fascinating', 'intriguing', 'engaging', 'compelling', 'cool'],
  difficult: ['hard', 'tough', 'tricky', 'challenging', 'not easy'],
  easy: ['simple', 'straightforward', 'basic', 'no-brainer', 'piece of cake'],
  very: ['really', 'pretty', 'quite', 'super', 'totally'],
  good: ['great', 'awesome', 'fantastic', 'amazing', 'excellent'],
  bad: ['terrible', 'awful', 'horrible', 'not great', 'poor'],
  said: ['mentioned', 'noted', 'pointed out', 'brought up', 'talked about'],
  show: ['demonstrate', 'reveal', 'indicate', 'suggest', 'point to'],
  many: ['lots of', 'plenty of', 'a bunch of', 'tons of', 'heaps of'],
  help: ['assist', 'support', 'aid', 'lend a hand', 'pitch in'],
};

const sentenceStarters = [
  'You know what,',
  'Here\'s the thing:',
  'Look,',
  'So basically,',
  'To be honest,',
  'The way I see it,',
  'From what I understand,',
  'In my experience,',
  'Generally speaking,',
  'As far as I can tell,',
];

const midSentenceTransitions = [
  'I mean,',
  'like,',
  'you know,',
  'sort of',
  'kind of',
  'basically',
  'pretty much',
  'more or less',
];

function rephraseVocabulary(text: string): string {
  let rephrased = text;
  
  Object.entries(vocabularyVariations).forEach(([word, variations]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    rephrased = rephrased.replace(regex, () => {
      return Math.random() < 0.7 ? getRandomItem(variations) : word;
    });
  });
  
  return rephrased;
}

function restructureSentences(text: string): string {
  const sentences = text.split('. ');
  
  return sentences.map(sentence => {
    // Skip short sentences
    if (sentence.length < 30) return sentence;

    // 30% chance to restructure a sentence
    if (Math.random() < 0.3) {
      const parts = sentence.split(',');
      
      if (parts.length > 1) {
        // Randomly reorder parts and add transitions
        shuffleArray(parts);
        return getRandomItem(sentenceStarters) + ' ' + parts.join(', ');
      }
      
      // Add mid-sentence transitions
      if (Math.random() < 0.4) {
        const words = sentence.split(' ');
        const position = Math.floor(words.length / 2);
        words.splice(position, 0, getRandomItem(midSentenceTransitions));
        return words.join(' ');
      }
    }
    
    return sentence;
  }).join('. ');
}

function addFillers(text: string): string {
  const sentences = text.split('. ');
  
  return sentences.map(sentence => {
    if (Math.random() < 0.25) {
      const filler = getRandomItem([
        'I think',
        'probably',
        'maybe',
        'from what I remember',
        'if I\'m not mistaken',
        'as far as I know',
      ]);
      return `${filler}, ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
    }
    return sentence;
  }).join('. ');
}

function addConversationalElements(text: string): string {
  const sentences = text.split('. ');
  
  return sentences.map(sentence => {
    if (Math.random() < 0.2) {
      const element = getRandomItem([
        'right?',
        'you know what I mean?',
        'if that makes sense',
        'or something like that',
        'at least that\'s what I think',
      ]);
      return `${sentence} (${element})`;
    }
    return sentence;
  }).join('. ');
}

export function humanizeText(text: string): string {
  // Split text into paragraphs for better processing
  let paragraphs = text.split('\n\n');
  
  paragraphs = paragraphs.map(paragraph => {
    let humanized = paragraph;

    // Apply transformations in a specific order for best results
    humanized = rephraseVocabulary(humanized);
    humanized = restructureSentences(humanized);
    humanized = addFillers(humanized);
    humanized = addConversationalElements(humanized);
    
    // Add some randomness to avoid patterns
    if (Math.random() < 0.5) {
      humanized = addFillers(humanized);
    }

    return humanized;
  });

  // Join paragraphs back together
  let finalText = paragraphs.join('\n\n');

  // Final cleanup and natural spacing
  finalText = finalText
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/([.,!?])(?!["\'])\s*/g, '$1 ')
    .trim();

  return finalText;
}