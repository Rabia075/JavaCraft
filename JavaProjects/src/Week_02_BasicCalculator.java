import java.util.Scanner;

public class Week_02_BasicCalculator {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("\nEnter first number: ");
        double num1 = input.nextDouble();
        System.out.print("Enter second number: ");
        double num2 = input.nextDouble();
        System.out.print("Enter operation (+, -, *, /): ");
        char operator = input.next().charAt(0);

        double result;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 != 0)
                    result = num1 / num2;
                else {
                    System.out.println("Error! Division by zero.");
                    input.close();
                    return;
                }
                break;
            default:
                System.out.println("Invalid operation!");
                input.close();
                return;
        }

        System.out.println("\nResult: " + result);

        input.close();
    }
}
