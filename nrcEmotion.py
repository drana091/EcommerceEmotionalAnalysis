import nltk
from nltk.tokenize import word_tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Function to load emotions from the NRC Emotion Lexicon file
def load_emotions():
    lexicon_path = nltk.data.find('corpora/NRC-Emotion-Lexicon-Wordlevel-v0.92.txt')
    emotion_lexicon = {}
    with open(lexicon_path, 'r') as file:
        for line in file:
            word, emotion, value = line.strip().split('\t')
            if emotion not in emotion_lexicon:
                emotion_lexicon[emotion] = []
            if int(value) == 1:
                emotion_lexicon[emotion].append(word)
    return emotion_lexicon

# Function to perform sentiment analysis using VADER
def perform_sentiment_analysis(text):
    sid = SentimentIntensityAnalyzer()
    sentiment_scores = sid.polarity_scores(text)
    return sentiment_scores

# Function to get emotions from text
def get_emotions(text, emotion_lexicon):
    emotions = {}
    for emotion, word_set in emotion_lexicon.items():
        emotions[emotion] = [word for word in word_tokenize(text) if word.lower() in word_set]
    return emotions

# Load emotion lexicon
emotion_lexicon = load_emotions()

# Example text
text = input("Enter a sentence: ")

# Perform sentiment analysis using VADER
sentiment_scores = perform_sentiment_analysis(text)

# Perform emotion analysis
emotion_words = get_emotions(text, emotion_lexicon)

# Output the sentiment analysis scores
print("Sentiment Analysis Score:")
print(sentiment_scores)
print()

# Find the emotion with the most associated words
max_emotion = max(emotion_words, key=lambda x: len(emotion_words[x]))

# Output the emotion with the most associated words and its associated words
print(f"Emotion with the most associated words: {max_emotion.capitalize()}")
print("Associated words:")
if emotion_words[max_emotion]:
    for word in emotion_words[max_emotion]:
        print(f"- {word}")
else:
    print("- No words associated with this emotion")

