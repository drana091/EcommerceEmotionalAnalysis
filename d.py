import nltk

# Function to load emotions from the NRC Emotion Lexicon file
def load_emotions():
    lexicon_path = nltk.data.find('corpora/NRC-Emotion-Lexicon-Wordlevel-v0.92.txt')
    emotion_lexicon = {}
    with open(lexicon_path, 'r') as file:
        for line in file:
            word, emotion, value = line.strip().split('\t')
            if emotion not in emotion_lexicon:
                emotion_lexicon[emotion] = set()
            if int(value) == 1:
                emotion_lexicon[emotion].add(word)
    return emotion_lexicon

# Function to get emotions from text
def get_emotions(text, emotion_lexicon):
    emotions = {emotion: 0 for emotion in emotion_lexicon.keys()}
    words = nltk.word_tokenize(text)
    for word in words:
        for emotion, word_set in emotion_lexicon.items():
            if word in word_set:
                emotions[emotion] += 1
    return emotions

# Load emotion lexicon
emotion_lexicon = load_emotions()

# Example text
text = "I love this product, it always makes me laugh."

# Perform emotion analysis
emotion_counts = get_emotions(text, emotion_lexicon)

# Output the result
print("Text:", text)
print("Emotion Counts:", emotion_counts)
