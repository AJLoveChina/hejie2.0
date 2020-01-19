package ajax.task;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import ajax.model.UrlRoute;
import ajax.model.entity.Exam;
import ajax.tools.Tools;

public class GenerateEmptyPaper {
	public static void main(String[] args) {
		Exam exam = new Exam();
		
		Exam.Paper paper = exam.new Paper();
		
		Exam.Data data = exam.new Data();
		
		Exam.Cover cover = exam.new Cover();
		int[] diffculty = {1, 2, 3};
		cover.setDifficulty(diffculty);
		cover.setImg(UrlRoute.PIC_EXAM.getUrl());
		cover.setNum(10);
		cover.setSeconds(300);
		cover.setTime("5分钟");
		cover.setTitle("请填写试题标题");
		cover.setType("选择题");
		
		List<Exam.Question> questions = new ArrayList<Exam.Question>();
		List<Exam.Choice> choices = new ArrayList<Exam.Choice>();
		
		
		
		int j = 1;
		int i = 1;
		
		do {
			
			Exam.Choice choice = exam.new Choice();
			choice.setChecked(false);
			choice.setTitle("选项 : " + j);
			
			choices.add(choice);
			
		}while(++j <= 4);
		
		do {
			Exam.Question q = exam.new Question();
			q.setFinish(false);
			q.setTitle("选择题 : " + i);
			q.setId(0);
			q.setChoices(choices);
			questions.add(q);
		}while(++i <= 10);
		
		data.setCover(cover);
		data.setQuestions(questions);
		data.setConfig(null);
		
		
		
		paper.setIsok(true);
		paper.setData(data);
		
		Gson gson = new Gson();
		String json = gson.toJson(paper);
		
		Tools.writeDataToFile(json, new File("WebRoot/static/exam/blank.txt"));
		
	}
}
