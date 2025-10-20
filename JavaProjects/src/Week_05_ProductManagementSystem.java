import java.util.Scanner;

class Product {    
    private String name;
    private double price;
    private int quantity;

    public Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public void displayProduct() {
        if (name == null) {
            System.out.println("\nNo product data available.");
        } else {
            System.out.println("Product Name : " + name);
            System.out.println("Price        : Rs. " + price);
            System.out.println("Quantity     : " + quantity);
        }
    } 

    public void updatePrice(double newPrice) {
        if (name == null) {
            System.out.println("\nNo product found to update.");
        } else if (newPrice > 0) {
            price = newPrice;
            System.out.println("\nPrice updated successfully!");
            System.out.println("New Price = Rs. " + price);
        } else {
            System.out.println("\nInvalid price. Update failed.");
        }
    }

    public void updateQuantity(int newQty) {
        if (name == null) {
            System.out.println("\nNo product found to update.");
        } else if (newQty >= 0) {
            quantity = newQty;
            System.out.println("\nQuantity updated successfully!");
            System.out.println("New Quantity = " + quantity);
        } else {
            System.out.println("\nInvalid quantity. Update failed.");
        }
    }

    public void searchProduct(String searchName) {
        if (name != null && name.equalsIgnoreCase(searchName)) {
            System.out.println("\nProduct found!");
            displayProduct();
        } else {
            System.out.println("\nNo product found with name: " + searchName);
        }
    }
 
    public void deleteProduct() {
        if (name == null) {
            System.out.println("\nNo product to delete.");
        } else {
            name = null;
            price = 0;
            quantity = 0;
            System.out.println("\nProduct deleted successfully!");
        }
    }
}


public class Week_05_ProductManagementSystem {
    public static void main(String[] args) {
        Scanner userInput = new Scanner(System.in);

        System.out.println("\n========== PRODUCT MANAGEMENT SYSTEM ==========\n");

        Product product = new Product("Wireless Mouse", 2500.0, 10);   // hardcoded entry 

        int choice;
        do {
            System.out.println("------ MENU ------");
            System.out.println("1.  View Product");
            System.out.println("2.  Update Price");
            System.out.println("3.  Update Quantity");
            System.out.println("4.  Search Product");
            System.out.println("5.  Delete Product");
            System.out.println("0.  Exit");
            System.out.print("\nChoose an option: ");
            choice = userInput.nextInt();

            switch (choice) {
                case 1:
                    product.displayProduct();
                    break;
                case 2:
                    System.out.println("\nUpdating price for: Wireless Mouse");
                    product.updatePrice(2800.0);   // hardcoded update 
                    break;
                case 3:
                    System.out.println("\nUpdating quantity for: Wireless Mouse");
                    product.updateQuantity(15);   // hardcoded update
                    break;
                case 4:
                    System.out.println("\nSearching product: Wireless Mouse");
                    product.searchProduct("Wireless Mouse");
                    break;
                case 5:
                    product.deleteProduct();
                    break;
                case 0:
                    System.out.println("\nExiting system!");
                    break;
                default:
                    System.out.println("\nInvalid choice. Please try again.");
            }

        } while (choice != 0);

        userInput.close();
    }
}
