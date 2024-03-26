import nltk
from nltk.sentiment import SentimentIntensityAnalyzer


def analyze_sentence(sentence):
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

    return sentiment_score, emotions, max_emotion

# Main function to get user input and perform sentiment analysis
def main():
    sentence = input("Enter a sentence: ")
    sentiment_score, emotions, max_emotion = analyze_sentence(sentence)

    print("\nSentiment Analysis Score:")
    print(sentiment_score)

    print("\nEmotions Categorized:")
    for emotion, words in emotions.items():
        print(f"{emotion.capitalize()}: {', '.join(words)}")

    print("\nEmotion with Highest Rating:")
    print(max_emotion.capitalize())

if __name__ == "__main__":
    main()
