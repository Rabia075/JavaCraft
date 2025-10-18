package Week_03;

import java.util.Scanner;
public class Task_11_PasswordRetries {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        String correctPassword = "secret123";
        int attempts = 3;

        while (attempts > 0) {
            System.out.print("Enter your password: ");
            String enteredPassword = input.nextLine();

            if (enteredPassword.equals(correctPassword)) {
                System.out.println("Login Successful!");
                input.close();
                return;
            } else {
                attempts--;
                if (attempts > 0) {
                    System.out.println("Incorrect password. You have " + attempts + " attempts left.\n");
                } else {
                    System.out.println("Account locked. Please contact support.");
                }
            }
        }

        input.close();
    }
}
