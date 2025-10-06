package Week_01;

import java.time.Year;
import java.util.Scanner;

public class Task_04_UserAge {
      public static void main(String[] args)
    {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter your birth year: ");
        
        int birthYear = input.nextInt();
        int currentYear = Year.now().getValue();
        int age = currentYear - birthYear;
        
        System.out.println("You are approximately " + age + " years old.");

        input.close();
    }
}
