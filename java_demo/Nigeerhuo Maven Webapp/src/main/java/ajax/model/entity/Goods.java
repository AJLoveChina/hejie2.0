package ajax.model.entity;

public class Goods extends Entity<Goods>{
	private int id;
	private String name;
	private float price;
	private String homeImg;
	private String desc;
	private String dateEntered;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getHomeImg() {
		return homeImg;
	}
	public void setHomeImg(String homeImg) {
		this.homeImg = homeImg;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getDateEntered() {
		return dateEntered;
	}
	public void setDateEntered(String dateEntered) {
		this.dateEntered = dateEntered;
	}

	
}
