package Week_05;

class Book {

    private String title;
    private String author;
    private int publicationYear;

    public void setBookInfo(String title, String author, int year) {
        this.title = title;
        this.author = author;
        this.publicationYear = year;
    }

    public void displayBookInfo() {
        System.out.println("\n");
        System.out.println("Title : " + title);
        System.out.println("Author: " + author);
        System.out.println("Year  : " + publicationYear);
    }
}

public class Task_19_BookInfo {
    public static void main(String[] args) {

        Book book1 = new Book();
        book1.setBookInfo("The Silent Patient", "Alex Michaelides", 2019);
        
        Book book2 = new Book();
        book2.setBookInfo("Atomic Habits", "James Clear", 2018);

        Book book3 = new Book();
        book3.setBookInfo("To Kill a Mockingbird", "Harper Lee", 1960);

        book1.displayBookInfo();
        book2.displayBookInfo();
        book3.displayBookInfo();

    }
}