package Week_05;

class Dog {

    String name;
    String breed;
    int age;

    public void bark() {
        System.out.println("" + name + " barks loudly! Woof!");
    }

    public void displayInfo() {
        System.out.println("Name  : " + name);
        System.out.println("Breed : " + breed);
        System.out.println("Age   : " + age + " years");
    }
}

public class Task_18_DogApp {
    public static void main(String[] args) {

        Dog dog1 = new Dog();
        dog1.name = "Buddy";
        dog1.breed = "Golden Retriever";
        dog1.age = 3;

        Dog dog2 = new Dog();
        dog2.name = "Rocky";
        dog2.breed = "German Shepherd";
        dog2.age = 5;

        System.out.println("\nMeet our first dog!");
        dog1.displayInfo();
        dog1.bark();

        System.out.println("\nMeet our second dog!");
        dog2.displayInfo();
        dog2.bark();
    }
}