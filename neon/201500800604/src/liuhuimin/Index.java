package liuhuimin;

import java.awt.BorderLayout;
import java.awt.Container;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.JTextField;

import liuhuimin.model.Item;

public class Index {
	public static final String ID = "201500800604";
	public static final String NAME = "liuhuimin";
	public static final int WIDTH = 500;
	public static final int HEIGHT = 300;
	
	
	public static void main(String[] args) {
		JFrame frame = new JFrame(ID + " " + NAME);
		
		frame.setLayout(null);
		
		JTextArea textarea = new JTextArea(10, 20);
		textarea.setBounds(0, 0, 190, 150);
		frame.add(textarea);
		
		JLabel bookNameLabel = new JLabel();
		bookNameLabel.setText("图书名称:");
		bookNameLabel.setBounds(200, 0, 100, 30);
		frame.add(bookNameLabel);
		final JTextField bookName = new JTextField(10);
		bookName.setBounds(260, 0, 100, 30);
		frame.add(bookName);
		
		
		JLabel authorLabel = new JLabel();
		authorLabel.setText("作者:");
		authorLabel.setBounds(200, 30, 100, 30);
		frame.add(authorLabel);
		final JTextField author = new JTextField(10);
		author.setBounds(260,30, 100, 30);
		frame.add(author);
		
		
		JLabel bookTypeLabel = new JLabel();
		bookTypeLabel.setText("图书类别:");
		bookTypeLabel.setBounds(200, 60, 100, 30);
		frame.add(bookTypeLabel);
		String[] choices = {"电子", "机械", "计算机", "小说"};
		final JComboBox<String> bookType = new JComboBox<>(choices);
		bookType.setBounds(260, 60, 100, 30);
		frame.add(bookType);
		
		
		JLabel priceLabel = new JLabel();
		priceLabel.setText("价格:");
		priceLabel.setBounds(200, 90, 100, 30);
		frame.add(priceLabel);
		final JTextField price = new JTextField(10);
		price.setBounds(260, 90, 100, 30);
		frame.add(price);
		
		JButton add = new JButton("添加");
		JButton write = new JButton("写文件");
		add.setBounds(200, 120, 80, 30);
		write.setBounds(290, 120, 80, 30);
		frame.add(add);
		frame.add(write);
		
		add.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				if (!canWrite(bookName, author, price)) {
					System.out.println("请填写信息后添加");
					return;
				}
				Item item = new Item(bookName.getText(), author.getText(), (String)bookType.getSelectedItem(), price.getText());
				textarea.append(item.toItem());
				clearItems(bookName, author, price);
				System.out.println("添加成功");
			}
		});
		
		write.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				
				if ("".equals(textarea.getText())) {
					
					if (!canWrite(bookName, author, price)) {
						System.out.println("请填写信息后写入");
						return;
					}
					
					Item item = new Item(bookName.getText(), author.getText(), (String)bookType.getSelectedItem(), price.getText());
					item.save();
				} else {
					Item.save(textarea.getText());
					textarea.setText("");
				}
			}
		});
		
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(WIDTH, HEIGHT);
		frame.setVisible(true);
	}
	
	private static void clearItems(final JTextField bookName,
			final JTextField author,
			final JTextField price) {
		bookName.setText("");
		author.setText("");
		price.setText("");
	}
	
	private static boolean canWrite(final JTextField bookName,
			final JTextField author,
			final JTextField price) {
		return !"".equals(bookName.getText()) &&
				!"".equals(author.getText()) &&
				!"".equals(price.getText());
		
	}
}
