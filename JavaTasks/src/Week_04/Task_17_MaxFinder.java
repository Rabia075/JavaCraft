package Week_04;

import java.util.Scanner;

public class Task_17_MaxFinder {
    
    public int findMax(int a, int b) {
        return (a > b) ? a : b;
    }
    public double findMax(double a, double b) {
        return (a > b) ? a : b;
    }

    //Main Method
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);
        Task_17_MaxFinder finder = new Task_17_MaxFinder();

        System.out.println("\nChoose an option:");
        System.out.println("1. Find Maximum (Integers)");
        System.out.println("2. Find Maximum (Decimals)");
        System.out.print("\nEnter your choice (1 or 2): ");
        int choice = input.nextInt();

        switch (choice) {
            case 1:
                System.out.println("\n--- Integer Comparison ---");
                System.out.print("Enter first integer: ");
                int int1 = input.nextInt();
                System.out.print("Enter second integer: ");
                int int2 = input.nextInt();

                int intMax = finder.findMax(int1, int2);
                System.out.println("\nBetween " + int1 + " and " + int2 + ", the larger value is " + intMax);
                break;

            case 2:
                System.out.println("\n--- Decimal Comparison ---");
                System.out.print("Enter first decimal number: ");
                double d1 = input.nextDouble();
                System.out.print("Enter second decimal number: ");
                double d2 = input.nextDouble();

                double doubleMax = finder.findMax(d1, d2);
                System.out.println("\nBetween " + d1 + " and " + d2 + ", the larger value is " + doubleMax);
                break;

            default:
                System.out.println("\nInvalid choice! Please run the program again and choose 1 or 2.");
        }

        input.close();
    }
}
