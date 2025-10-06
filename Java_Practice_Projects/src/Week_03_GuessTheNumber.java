import java.util.Scanner;
import java.util.Random;

public class Week_03_GuessTheNumber {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);
        Random random = new Random();

        int randomNumber = random.nextInt(100) + 1;
        int guess;
        int attempts = 0;

        System.out.println("Welcome to the Number Guessing Game!");
        System.out.println("I have chosen a number between 1 and 100.");
        System.out.println("Can you guess what it is?\n");

        while (true) {
            System.out.print("Enter your guess: ");
            guess = input.nextInt();
            attempts++;

            if (guess == randomNumber) {
                System.out.println("\n🎉 Congratulations!");
                System.out.println("You guessed the correct number: " + randomNumber);
                System.out.println("It took you " + attempts + " attempt" + (attempts > 1 ? "s" : "") + "!");
                System.out.println("Thanks for playing!");
                break;
            } 
            else if (guess > randomNumber) {
                System.out.println("Too high! Try a smaller number.\n");
            } 
            else {
                System.out.println("Too low! Try a larger number.\n");
            }

            // Optional hint system
            if (attempts % 3 == 0) {
                System.out.println("(Hint: The number is " 
                    + (randomNumber % 2 == 0 ? "even" : "odd") + "!)\n");
            }
        }

        input.close();
    }
}