package Week_03;

import java.util.Scanner;

public class Task_13_SumAndAverage {
public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.println("=== Sum & Average Calculator ===\n");
        System.out.print("How many numbers would you like to enter? ");
        int count = input.nextInt();

        double sum = 0;
        double number;

        System.out.println("\nEnter your " + count + " numbers:");

        for (int i = 1; i <= count; i++) {
            System.out.print("Number " + i + ": ");
            number = input.nextDouble();
            sum += number;
        }

        double average = sum / count;

        System.out.println("\n===== Result =====");
        System.out.printf("Total Numbers Entered: %d%n", count);
        System.out.printf("Sum: %.2f%n", sum);
        System.out.printf("Average: %.2f%n", average);

        input.close();
    }
}
