import java.util.Scanner;

public class Week_01_EasyTip {
    public static void main(String[] args) {
        
        Scanner input = new Scanner(System.in);

        System.out.print("Enter your bill amount: ");
        double billAmount = input.nextDouble();

        System.out.print("Enter tip percentage (e.g., 15 for 15%): ");
        double tipPercentage = input.nextDouble();

        double tipAmount = billAmount * (tipPercentage / 100);
        double totalAmount = billAmount + tipAmount;

        System.out.println("\n--- Tip Calculation Result ---");
        System.out.println("Bill Amount: " + billAmount);
        System.out.println("Tip Percentage: " + tipPercentage + "%");
        System.out.println("Tip Amount: " + tipAmount);
        System.out.println("Total Amount: " + totalAmount);

        input.close();
    }
}