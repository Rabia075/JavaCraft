import java.util.Scanner;

public class Week_01_EasyTip {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("\nEnter your bill amount: ");
        double billAmount = input.nextDouble();
        input.nextLine(); // clear buffer

        System.out.print("Enter tip percentage (press Enter for default 15%): ");
        String tipInput = input.nextLine();

        double tipPercentage;
        if (tipInput.isEmpty()) {
            tipPercentage = 15.0; // default tip
            System.out.println("Default tip of 15% applied.");
        } else {
            tipPercentage = Double.parseDouble(tipInput);
        }

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