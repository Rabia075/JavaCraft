package Week_04;

import java.util.Scanner;

public class Task_15_CalcProgram {

    public static double calculateProduct(double num1, double num2) {
        return num1 * num2;
    }
    public static double calculateQuotient(double num1, double num2) {
        if (num2 == 0) {
            System.out.println("Cannot calculate quotient — division by zero is not allowed!");
            return 0;
        }
        return num1 / num2;
    }

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("\nEnter the first number: ");
        double num1 = input.nextDouble();
        System.out.print("Enter the second number: ");
        double num2 = input.nextDouble();

        System.out.println("\n--- Results ---");

        double product = calculateProduct(num1, num2);
        System.out.println("Product of " + num1 + " and " + num2 + " = " + product);
        double quotient = calculateQuotient(num1, num2);
        if (num2 != 0) {
            System.out.println("Quotient of " + num1 + " and " + num2 + " = " + quotient);
        }

        System.out.println("\nCalculation complete!");
        input.close();
    }
}