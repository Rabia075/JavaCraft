import java.util.Scanner;

public class EasyTip {
    public static void main(String[] args) {
        
        Scanner input = new Scanner(System.in);

        // Step 1: Ask user for preferred currency (e.g., PKR, USD, EUR, INR)
        System.out.print("Enter your currency (e.g., PKR, USD, EUR, INR): ");
        String currency = input.next().toUpperCase();

        // Step 2: Take Bill Amount!
        System.out.print("Enter your bill amount (" + currency + "): ");
        double billAmount = input.nextDouble();

        // Step 3: Ask for tip percentage (e.g., 10, 15 20)
        System.out.print("Enter tip percentage (e.g., 15 for 15%): ");
        double tipPercentage = input.nextDouble();

        // Step 4: Calculate tip and total
        double tipAmount = billAmount * (tipPercentage / 100);
        double totalAmount = billAmount + tipAmount;

        // Step 5: Return results in same currency
        System.out.println("\n--- Tip Calculation Result ---");
        System.out.println("Bill Amount: " + billAmount + " " + currency);
        System.out.println("Tip Percentage: " + tipPercentage + "%");
        System.out.println("Tip Amount: " + tipAmount + " " + currency);
        System.out.println("Total Amount: " + totalAmount + " " + currency);

        input.close();
    }
}
