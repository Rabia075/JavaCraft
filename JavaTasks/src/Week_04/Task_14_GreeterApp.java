package Week_04;

public class Task_14_GreeterApp {
    
    public static void greetUser(String userName) {
        System.out.println("Hello, " + userName + "! Welcome to our app.");
    }

    public static void main(String[] args) {

        //Calling the greetUser method with different names
        greetUser("Ayesha");
        greetUser("Ali");
        greetUser("Hassan");
        greetUser("Zara");
        greetUser("Fatima");

        System.out.println("\nThank you for visiting our app! Have a great day!");
    }
}
