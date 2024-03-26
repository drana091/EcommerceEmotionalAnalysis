import nltk
from nltk.sentiment import SentimentIntensityAnalyzer


def reviewEmotion(sentence):
    # Initialize VADER sentiment analyzer
    sia = SentimentIntensityAnalyzer()

    # Perform sentiment analysis on the sentence
    sentiment_score = sia.polarity_scores(sentence)

    # Categorize words into different emotions
    emotions = {
        'love': [],
        'joy': [],
        'surprise': [],
        'anger': [],
        'sadness': [],
        'fear': [],
    }

    # Classify words based on sentiment scores
    for word in sentence.split():
        word_sentiment = sia.polarity_scores(word)
        if word_sentiment['compound'] >= 0.5:  # Joy
            emotions['joy'].append(word)
        elif word_sentiment['compound'] >= 0.3:  # Love
            emotions['love'].append(word)
        elif word_sentiment['compound'] >= 0.1:  # Surprise
            emotions['surprise'].append(word)
        elif word_sentiment['compound'] <= -0.5:  # Anger
            emotions['anger'].append(word)
        elif word_sentiment['compound'] <= -0.3:  # Sadness
            emotions['sadness'].append(word)
        elif word_sentiment['compound'] <= -0.1:  # Fear
            emotions['fear'].append(word)

    # Find the emotion with the highest rating
    max_emotion = max(emotions, key=lambda k: len(emotions[k]))

    return max_emotion
