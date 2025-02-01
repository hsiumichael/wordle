"""Provide colors for Wordle game."""
from colorama import Fore, Style

# Initialize for the game
correctWord = "ABOUT"
attempts = 1
correctGuess = False
print("Guess a 5 letter word:")

# 0 = not checked, 1 = incorrect, 2 = letter in wrong slot, 3 = correct
while (attempts <= 6 and correctGuess == False):
    while True:
        wordGuess = str(input()).upper()
        if wordGuess.isalpha():
            if len(wordGuess) == 5:
                break
            else:
                print("Please enter a 5 letter word.")
        else:
            print("Make sure the word contains only letters.")
    wordCheck = [0, 0, 0, 0, 0]
    remaining_correct_letters = list(correctWord)
    remaining_guess_letters = list(wordGuess)
    c = 0
    while c < 5:
        if wordGuess[c] == correctWord[c]:
            wordCheck[c] = 3
            remaining_correct_letters[c] = "!"
            remaining_guess_letters[c] = "!"
        c += 1
    if wordCheck == [3, 3, 3, 3, 3]:
        correctGuess = True
    else:
        w = 0
        while w < 5:
            if (wordCheck[w] == 0 and remaining_guess_letters[w] not in remaining_correct_letters):
                wordCheck[w] = 1
            w += 1
        i = 0
        while i < 5:
            if wordCheck[i] == 0:
                j = 0
                while j < 5:
                    if remaining_guess_letters[i] == remaining_correct_letters[j]:
                        wordCheck[i] = 2
                        remaining_guess_letters[i] = "?"
                        remaining_correct_letters[j] = "?"
                        break
                    j += 1
                if wordCheck[i] == 0:
                    wordCheck[i] = 1
            i += 1
        attempts += 1
    p = 0
    while p < 5:
        if wordCheck[p] == 3:
            print(Fore.GREEN + wordGuess[p], end="")
        elif wordCheck[p] == 2:
            print(Fore.YELLOW + wordGuess[p], end="")
        else:
            print(Fore.RED + wordGuess[p], end="")    
        p += 1
    print(Style.RESET_ALL + "")

if correctGuess == True:
    print(Style.RESET_ALL + "You guessed the word! Congratulations!")
else:
    print(Style.RESET_ALL + "The correct word is " + correctWord)
