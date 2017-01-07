package liuhuimin.model;

import java.io.File;

import liuhuimin.util.Tools;

public class Item {
	private String bookName;
	private String authorName;
	private String bookType;
	private float price;
	public String getBookName() {
		return bookName;
	}
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}
	public String getAuthorName() {
		return authorName;
	}
	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}
	public String getBookType() {
		return bookType;
	}
	public void setBookType(String bookType) {
		this.bookType = bookType;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public Item(String bookName, String authorName, String bookType, String price) {
		super();
		this.bookName = bookName;
		this.authorName = authorName;
		this.bookType = bookType;
		this.price = Float.parseFloat(price);
	}
	@Override
	public String toString() {
		return "Item [bookName=" + bookName + ", authorName=" + authorName + ", bookType=" + bookType + ", price="
				+ price + "]";
	}
	
	public String toItem() {
		return this.bookName + "," + this.authorName + "," + this.bookType + "," + this.price + "\n";
	}
	
	public void save() {
		
		Tools.appendDataToFile(this.toItem(), new File("books.txt"));
	}
	
	public static void save(String text) {
		Tools.appendDataToFile(text, new File("books.txt"));
	}
}
