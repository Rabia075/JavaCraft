import java.util.Scanner;
import java.util.Random;

public class Week_03_GuessTheNumber {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);
        Random random = new Random();

        int randomNumber = random.nextInt(100) + 1;
        int guess;
        int attempts = 0;
        boolean hintGiven = false;

        System.out.println("\nWelcome to the Number Guessing Game!");
        System.out.println("I've chosen a number between 1 and 100.");
        System.out.println("Try to guess it correctly!\n");

        while (true) {
            System.out.print("Enter your guess: ");
            guess = input.nextInt();
            attempts++;

            boolean userIsEven = guess % 2 == 0;
            boolean numberIsEven = randomNumber % 2 == 0;

            if (!hintGiven && userIsEven != numberIsEven) {
                System.out.println("\nHint: The secret number is " 
                    + (numberIsEven ? "EVEN" : "ODD") 
                    + ". Think wisely before it slips away!");
                hintGiven = true;
            }

            //Check guess correctness
            if (guess == randomNumber) {
                System.out.println("\nCongratulations!");
                System.out.println("You guessed the correct number: " + randomNumber);
                System.out.println("Attempts taken: " + attempts);
                System.out.println("Thanks for playing!");
                break;
            } 
            else if (guess > randomNumber) {
                System.out.println("Too high! Try a smaller number.\n");
            } 
            else {
                System.out.println("Too low! Try a larger number.\n");
            }
        }

        input.close();
    }
}