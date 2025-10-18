package Week_03;

import java.util.Scanner;

public class Task_12_TableGenerator {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter a number to generate its table: ");
        int number = input.nextInt();

        System.out.print("Enter how far to display the table (press Enter for default 10): ");
        input.nextLine(); // consume leftover newline
        String limitInput = input.nextLine();

        int limit;
        if (limitInput.isEmpty()) {
            limit = 10; // default value
        } else {
            limit = Integer.parseInt(limitInput);
        }

        System.out.println("\nMultiplication Table of " + number + " is:");

        for (int i = 1; i <= limit; i++) {
            System.out.println(number + " x " + i + " = " + (number * i));
        }

        System.out.println("\nTable generated successfully!");
        input.close();
    }
}
