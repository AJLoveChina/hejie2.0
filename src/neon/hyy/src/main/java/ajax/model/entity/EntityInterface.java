package ajax.model.entity;

import java.util.Iterator;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.metadata.ClassMetadata;

import ajax.model.FormComponents;
import ajax.model.ItemStatus;
import ajax.model.exception.AJRunTimeException;
import ajax.tools.HibernateUtil;

public interface EntityInterface<T> {

	/**
	 * 这是为实体类准备的公用字段, 由于历史遗留问题, 有些类的这些值可能为null<br>
	 * 如果实体类自定义类似的字段, 比如 dateEntered, 您应当使用实体类(子类)自定义的字段.因为有这些字段的类基本都是2016.9.18之前何杰写的, 而且它们对应的数据表中往往不存在如下的几个字段<br>
	 * 我们约定9.18之后, 所有的类如果在数据表中定义了 保存, 修改, 删除时间字段, 请使用如下的字段名称.不要重新在子类中定义相关时间字段.谢谢
	 */
	String getDateEnteredOfSave();

	void setDateEnteredOfSave(String dateEnteredOfSave);

	/**
	 * 这是为实体类准备的公用字段, 由于历史遗留问题, 有些类的这些值可能为null<br>
	 * 如果实体类自定义类似的字段, 比如 dateEntered, 您应当使用实体类(子类)自定义的字段.因为有这些字段的类基本都是2016.9.18之前何杰写的, 而且它们对应的数据表中往往不存在如下的几个字段<br>
	 * 我们约定9.18之后, 所有的类如果在数据表中定义了 保存, 修改, 删除时间字段, 请使用如下的字段名称.不要重新在子类中定义相关时间字段.谢谢
	 */
	String getDateEnteredOfUpdate();

	void setDateEnteredOfUpdate(String dateEnteredOfUpdate);

	/**
	 * 这是为实体类准备的公用字段, 由于历史遗留问题, 有些类的这些值可能为null<br>
	 * 如果实体类自定义类似的字段, 比如 dateEntered, 您应当使用实体类(子类)自定义的字段.因为有这些字段的类基本都是2016.9.18之前何杰写的, 而且它们对应的数据表中往往不存在如下的几个字段<br>
	 * 我们约定9.18之后, 所有的类如果在数据表中定义了 保存, 修改, 删除时间字段, 请使用如下的字段名称.不要重新在子类中定义相关时间字段.谢谢
	 */
	String getDateEnteredOfDelete();

	void setDateEnteredOfDelete(String dateEnteredOfDelete);

	String getStatusSplitByComma();

	void setStatusSplitByComma(String statusSplitByComma);

	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#addItemStatus(ajax.model.ItemStatus)
	 */
	void addItemStatus(ItemStatus itemStatus);

	/**
	 * 删除某个状态
	 * @param itemStatus
	 */
	void removeIemStatus(ItemStatus itemStatus);

	/**
	 * item是否处于某种指定状态
	 * @param itemStatus
	 * @return
	 */
	boolean isInThisItemStatus(ItemStatus itemStatus);

	String getPrimaryKey();
	
	/**
	 * 是否设置了主键的值<br>
	 * 用来判断一个entity应该save 还是 update
	 * @return
	 */
	boolean isSetPrimaryKeyValue();

	boolean save();

	void save(Session session);

	void update(Session session);

	void delete(Session session);

	boolean update();

	boolean delete();

	T getById(int id);

	/**
	 * 根据主键id值从数据库加载该实体对象
	 * @param id
	 */
	boolean load(int id);

	/**
	 * 根据主键id值从数据库加载该实体对象
	 * @param id
	 */
	boolean load(long id);

	String getTableName();

	List<T> getPage(int page, int pageNum);

	List<T> getList(Criteria criteria);

	String toJson();

	/**
	 * 快速得到表单组件, 在相应的jsp页面中渲染
	 * @param cls
	 * @return
	 * @throws AJRunTimeException
	 */
	FormComponents getFormComponents(Class<T> cls) throws AJRunTimeException;

	/**
	 * 一个个迭代数据表中的所有元素
	 */
	Iterator<T> iterator();

	boolean hasNext();

	T next();

	
}