package kr.or.iei.cashbook.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.cashbook.model.dao.CashbookDao;

@Service
public class CashbookService {

	@Autowired
	private CashbookDao cashbookDao;
}
