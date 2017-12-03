const MS = require('./messenger_actions');
const SLEEP = require('./sleepMessenger');
const CITY = require('../const/cities');
const DISTRICT = require('../const/district');
const payloads = require('../const/constants_payload');
const action = require('../const/constants_action');
const sleep = require('./sleepMessenger');
const urls = require('../const/constants_url');


module.exports = {

	initDialogs(senderId) {
		console.log('responseMessenger.initDialogs...');
		var quickReplices = [
	        MS.genericQuicKRepliesText(payloads.PBK_INIT_DIALOGS, 'Vamos começar!'),
	    ];

		var text = "Se quiser que eu te ajude a entender o Plano de Metas, é só clicar no botão a abaixo ;)";
	    sleep.sleepQuickReplices(senderId, quickReplices, text, 1800);
	},

	presentFirstDialogOptions(senderId) {
		console.log('responseMessenger.presentFirstDialogOptions...');
		var quickReplices = [
	        MS.genericQuicKRepliesText(payloads.PBK_PAST_MANAGEMENT, 'Gestão passada'),
	        MS.genericQuicKRepliesText(payloads.PBK_KNOW, 'Conhecer lei'),
	    ];

		var text = "Você gostaria de conhecer melhor como a Lei de Metas funciona, ou prefere ver como ficou o Plano de Metas da gestão passada (2013/2016)?";
	    sleep.sleepQuickReplices(senderId, quickReplices, text, 1600);
	},

	restartDialogs(senderId) {
		console.log('responseMessenger.restartDialogs...');

		var quickReplices = [
	        MS.genericQuicKRepliesText(payloads.PBK_PAST_MANAGEMENT, 'Gestão passada'),
	        MS.genericQuicKRepliesText(payloads.PBK_KNOW, 'Conhecer lei'),
	    ];

		var text = "Ok, você gostaria de ver como ficou o Plano de Metas de 2013 ou conhecer mais sobre a Lei de Metas?";
	    sleep.sleepQuickReplices(senderId, quickReplices, text, 1800);
	},

	restartDialogsKnow(senderId) {
		console.log('responseMessenger.restartDialogsKnow...');

	    var obligation_btn = [MS.genericButtonPostback(payloads.PBK_OBLIGATION_INFO, 'Ver')];
	    var cities_btn = [MS.genericButtonPostback(payloads.PBK_CITIES_INFO, 'Cidades')];
	    var participation_btn = [MS.genericButtonPostback(payloads.PBK_POPULAR_PARTICIPATION_INFO, 'Participação')];
	    var more = [MS.genericButtonLink(urls.URL_ABOUT, 'Saber mais')];

	    var elements = [
	        MS.genericElements('Obrigações', 'Entenda as obrigações da prefeitura', obligation_btn, 'http://www.carreiradoadvogado.com.br/wp-content/uploads/2017/04/Retroatividade_e_irretroatividade_da_lei_penal_afinal_o_que_%C3%A9_isso.jpg-800x534.jpeg'),
	        MS.genericElements('Participação Popular', 'Entenda como colaborar com o Plano de Metas', participation_btn, 'http://cspb.org.br/UserFiles/Image/participacao-popular(1).png'),
	        MS.genericElements('Cidades que aderiram', 'Conhece as cidades que aderiram a Lei de Metas?', cities_btn, 'http://lounge.obviousmag.org/arquitexturas_musicais_e_a_vida/sao-paulo42.jpg'),
	        MS.genericElements('Conhecer mais', 'Conhecer mais a fundo a lei de metas', more, 'http://e-tinet.com/wp-content/uploads/2009/09/Linux-10-gerenciadores-de-arquivos-que-devemos-conhecer.jpeg')
	    ];

		sleep.sleepTextMessage(senderId, 'Ótimo, sobre qual assunto quer conversar?', 2000);
		sleep.sleepGenericMenu(senderId, elements, 2200);
	},

	optionsObligationTargetLawMore(senderId, value) {
		console.log("responseMessenger.optionsObligationTargetLawMore -> value: ", value);

		var quickReplices = [MS.genericQuicKRepliesText(payloads.PBK_RESTART_DIALOGS, 'Mudar assunto!')];

		if (value != action.ACTION_SHOULD_CONTAIN) quickReplices.push(MS.genericQuicKRepliesText(payloads.PBK_SHOULD_CONTAIN, 'Plano deve conter'));
		if (value != action.ACTION_PUBLIC_AUDIENCE) quickReplices.push(MS.genericQuicKRepliesText(payloads.PBK_AUDIENCES_INFO, 'Audiências públicas'));
		if (value != action.ACTION_ACCOUNTABILITY) quickReplices.push(MS.genericQuicKRepliesText(payloads.PBK_ACCOUNTABILITY, 'Prestação de contas'));

	    var text = "Quer saber mais sobre as obrigações, ou vamos mudar de assunto?";
	    sleep.sleepQuickReplices(senderId, quickReplices, text, 2500);
	},

	verifyMyCity(senderId, response) {
		console.log('responseMessenger.verifyMyCity...');
		if(response && response.result && response.result.parameters) {
			var city = response.result.parameters['geo-city'];
			if(city && CITY.get(city)) {
				MS.textMessage(senderId, CITY.get(city)[Math.floor(Math.random()*CITY.get(city).length)]);
				sleep.sleepTextMessage(senderId, 'Se quiser saber sobre outra cidade, é só me informar o nome dela. Ou escolha uma opção do menu, para que eu te ajude com outro assunto.', 1500);
			} else {
				var city = response.result.parameters['geo-city'];
				var text = 'Infelizmente, ainda não foi implantada a Lei de Metas em ' + city;
				MS.textMessage(senderId, text);
				sleep.sleepTextMessage(senderId, 'Mas não se esqueça que a participação popular é muito importante para que o prefeito de sua cidade implante a Lei de Metas ;)', 1500);
			}
		} else {
			MS.textMessage(senderId, 'Desculpe, não entendi o nome de sua cidade =/');
		}
	},

	verifyDistrict(senderId, response) {
		console.log('responseMessenger.verifyDistrict...');
		if(response && response.result && response.result.parameters) {
			var district = response.result.parameters['district'];
			console.log("responseMessenger.verifyDistrict -> district: ", district);
		} else {
			console.log("responseMessenger.verifyDistrict -> district is null");
		}
	},

	verifyTheme(senderId, response) {
		console.log('responseMessenger.verifyTheme...');
		if(response && response.result && response.result.parameters) {
			var district = response.result.parameters['theme'];
			console.log("responseMessenger.verifyTheme -> theme: ", district);
		} else {
			console.log("responseMessenger.verifyTheme -> theme is null");
		}
	},

	responseMessage(senderId, response) {
		console.log('responseMessenger.responseMessage...');
		if(response && response.result && 
			response.result.fulfillment && 
			response.result.fulfillment.speech) {
			console.log(response.result.fulfillment.speech);
			MS.textMessage(senderId, response.result.fulfillment.speech);
		}
	},

	message(senderId, text) {
		console.log('responseMessenger.message...');
		if(text) {
			console.log(text);
			MS.textMessage(senderId, text);
		}
	},

	responseLinkDonm(senderId) {
		console.log('responseMessenger.responseLinkDonm...');
		var text = 'Logo poderei te ajudar a acompanhar as metas, mas por enquanto você pode ver como as metas da gestão passada ficaram';
		sleep.sleepTextMessage(senderId, text, 1600);
		sleep.sleepTextMessage(senderId, 'deolhonasmetas.org.br/', 2000);
	},

	menuAboutLaw(senderId, response) {
		console.log('responseMessenger.menuAboutLaw...');
	    var obligation_btn = [MS.genericButtonPostback(payloads.PBK_OBLIGATION_INFO, 'Ver')];
	    var cities_btn = [MS.genericButtonPostback(payloads.PBK_CITIES_INFO, 'Cidades')];
	    var participation_btn = [MS.genericButtonPostback(payloads.PBK_POPULAR_PARTICIPATION_INFO, 'Participar')];
	    var more = [MS.genericButtonLink(urls.URL_ABOUT, 'Saber mais')];

	    var elements = [
	        MS.genericElements('Obrigações', 'Entenda as obrigações da prefeitura', obligation_btn, 'http://www.carreiradoadvogado.com.br/wp-content/uploads/2017/04/Retroatividade_e_irretroatividade_da_lei_penal_afinal_o_que_%C3%A9_isso.jpg-800x534.jpeg'),
	        MS.genericElements('Participação Popular', 'Entenda como colaborar com o Plano de Metas', participation_btn, 'http://cspb.org.br/UserFiles/Image/participacao-popular(1).png'),
	        MS.genericElements('Cidades que aderiram', 'Conhece as cidades que aderiram a Lei de Metas?', cities_btn, 'http://lounge.obviousmag.org/arquitexturas_musicais_e_a_vida/sao-paulo42.jpg'),
	        MS.genericElements('Conhecer mais', 'Conhecer mais a fundo a lei de metas', more, 'http://e-tinet.com/wp-content/uploads/2009/09/Linux-10-gerenciadores-de-arquivos-que-devemos-conhecer.jpeg')
	    ];

		sleep.sleepTextMessage(senderId, 'Veja mais sobre a Lei de Metas:', 2000);
		sleep.sleepGenericMenu(senderId, elements, 2200);
	},

	optionsObligationTargetLaw(senderId) {
		console.log('responseMessenger.optionsObligationTargetLaw...');
		var quickReplices = [
	        MS.genericQuicKRepliesText(payloads.PBK_SHOULD_CONTAIN, 'Plano deve conter'),
	        MS.genericQuicKRepliesText(payloads.PBK_AUDIENCES_INFO, 'Audiências públicas'),
	        MS.genericQuicKRepliesText(payloads.PBK_ACCOUNTABILITY, 'Prestação de contas')
	    ];

	    var text = "Ah, e também são exigidas, algumas ações da prefeitura. Sobre qual deseja saber?";
	    sleep.sleepQuickReplices(senderId, quickReplices, text, 1800);
	},

	optionsObligationTargetLawMore(senderId, value) {
		console.log("responseMessenger.optionsObligationTargetLawMore -> value: ", value);

		var quickReplices = [MS.genericQuicKRepliesText(payloads.PBK_RESTART_DIALOGS, 'Mudar assunto!')];

		if (value != action.ACTION_SHOULD_CONTAIN) quickReplices.push(MS.genericQuicKRepliesText(payloads.PBK_SHOULD_CONTAIN, 'Plano deve conter'));
		if (value != action.ACTION_PUBLIC_AUDIENCE) quickReplices.push(MS.genericQuicKRepliesText(payloads.PBK_AUDIENCES_INFO, 'Audiências públicas'));
		if (value != action.ACTION_ACCOUNTABILITY) quickReplices.push(MS.genericQuicKRepliesText(payloads.PBK_ACCOUNTABILITY, 'Prestação de contas'));

	    var text = "Quer saber mais sobre as obrigações, ou vamos mudar de assunto?";
	    sleep.sleepQuickReplices(senderId, quickReplices, text, 2500);
	},

	optionsPopularParticipation2017Management(senderId) {
		console.log('responseMessenger.optionsPopularParticipation2017Management...');
		var quickReplices = [
	        MS.genericQuicKRepliesText(payloads.PBK_DISTRIC_MAJOR_PARTICIPATION, 'Onde?'),
	        MS.genericQuicKRepliesText(payloads.PBK_AUDIENCES_PARTICIPATION, 'Audiência pública'),
	        MS.genericQuicKRepliesText(payloads.PBK_PLATFORM_PARTICIPATION, 'Plataforma eletrônica'),
	        MS.genericQuicKRepliesText(payloads.PBK_EMAIL_PARTICIPATION, 'Ofícios/emails')
	    ];

	    var text = "Quer saber onde houve a maior participação popular, ou prefere ver como foi realizada a colaboração em cada um desses meios?";
	    sleep.sleepQuickReplices(senderId, quickReplices, text, 1800);
	},

	optionsPopularParticipation2017ManagementMore(senderId, value) {
		console.log("responseMessenger.optionsPopularParticipation2017ManagementMore -> value: ", value);

		var quickReplices = [MS.genericQuicKRepliesText(payloads.PBK_RESTART_DIALOGS, 'Mudar assunto!')];

		if (value !== action.ACTION_DISTRICT_MAJOR_PARTICIPATION) quickReplices.push(MS.genericQuicKRepliesText(payloads.PBK_DISTRIC_MAJOR_PARTICIPATION, 'Onde?'));
		if (value !== action.ACTION_PUBLIC_AUDIENCE_PARTICIPATION) quickReplices.push(MS.genericQuicKRepliesText(payloads.PBK_AUDIENCES_PARTICIPATION, 'Audiência pública'));
		if (value !== action.ACTION_PLATFORM_PARTICIPATION_ACTION) quickReplices.push(MS.genericQuicKRepliesText(payloads.PBK_PLATFORM_PARTICIPATION, 'Plataforma eletrônica'));
		if (value !== action.ACTION_EMAIL_PARTICIPATION) quickReplices.push(MS.genericQuicKRepliesText(payloads.PBK_EMAIL_PARTICIPATION, 'Ofícios/emails'));

	    var text = "Quer continuar vendo, ou vamos mudar de assunto?";
	    sleep.sleepQuickReplices(senderId, quickReplices, text, 2500);
	},

	messsengerCardCities(senderId) {
		console.log('responseMessenger.messsengerCardCities...');
		var button1 = [MS.genericButtonPostback(payloads.PBK_MY_CITY, 'Verificar')];
	    var button2 = [MS.genericButtonLink(urls.URL_ALL_CITIES, 'Conhecer')];

	    var elements = [
	        MS.genericElements('E minha cidade?', 'Descubra se sua cidade já implantou a lei de metas?', button1, 'http://img.freepik.com/vetores-gratis/travel-road-street-map-with-location-pin-simbolo-ilustracao-vetorial_1284-2005.jpg'),
	        MS.genericElements('Todas cidades', 'Conheça todas as cidades que implantaram a lei de metas.', button2, 'https://previews.123rf.com/images/denispc/denispc1303/denispc130300037/18452620-Map-of-Brazil-with-all-capitals-Cities-of-Brazil--Stock-Photo.jpg'),
	    ];

	    sleep.sleepTextMessage(senderId, 'Você gostaria de saber:', 1600);
	    sleep.sleepGenericMenu(senderId, elements, 2000);
	},

	optionsGoal(senderId) {
		console.log('responseMessenger.optionsPastGoal...');
	    var quickReplices = [
	        MS.genericQuicKRepliesText(payloads.PBK_PAST_GOAL_DISTRICT, 'Distrito (ex: Butantã)'),
	        MS.genericQuicKRepliesText(payloads.PBK_PAST_GOAL_THEME, 'Tema (ex: Saúde)')
	    ];

	    sleep.sleepQuickReplices(senderId, quickReplices, 'Você gostaria de conhecer as metas de um Tema (eixo) ou de um distrito específico?', 2000);							
	},

	optionsProject(senderId) {
		console.log('responseMessenger.optionsProject...');
		var quickReplices = [
	        MS.genericQuicKRepliesText(payloads.PBK_PROJECT_DISTRICT, 'Distrito (ex: Butantã)'),
	        MS.genericQuicKRepliesText(payloads.PBK_PROJECT_THEME, 'Tema (ex: Saúde)')
	    ];

	    sleep.sleepQuickReplices(senderId, quickReplices, 'Você gostaria de conhecer os projetos de um Tema (eixo) ou de um distrito específico?', 2000);
	},

	optionsPastManagement(senderId) {
		console.log('responseMessenger.optionsPastManagement...');
		var quickReplices = [
	        MS.genericQuicKRepliesText(payloads.PBK_PAST_GOAL, 'Metas'),
	        MS.genericQuicKRepliesText(payloads.PBK_PAST_PROJECT, 'Projetos')
	    ];

	    sleep.sleepQuickReplices(senderId, quickReplices, 'Você gostaria de conhecer as metas para São Paulo, ou prefere conhecer os projetos espalhados pela cidade?', 1800);
	},

	optionsPastManagementSearchFailure(senderId, text) {
		console.log('responseMessenger.optionsPastManagementSearchFailure...');
		var quickReplices = [
	        MS.genericQuicKRepliesText(payloads.PBK_PAST_GOAL, 'Metas'),
	        MS.genericQuicKRepliesText(payloads.PBK_PAST_PROJECT, 'Projetos')
	    ];

	    sleep.sleepQuickReplices(senderId, quickReplices, text, 1800);
	},

	responseAddressProject(senderId, project, res) {
		console.log('responseMessenger.responseAddressProject...');
		//Monta texto com endereço do projeto
		var streetNeighborhood = res[0].extra['neighborhood'];
		var streetName = res[0].streetName;
		var addressText = "Esse projeto fica na ".concat(streetName).concat(", no(a) ").concat(streetNeighborhood);
		//Envia mensagem do endereço do projeto
		MS.textMessage(senderId, addressText);
	},

	responsePastManagementItensProject(senderId, project, introductory_text) {
		console.log('responseMessenger.responsePastManagementItensProject...');
		//var text = {'O que mais deseja saber sobre a meta?', 'Veja mais informações dessa meta:', 'Confira mais informações desse meta:'}
		var urlProject = urls.URL_PROJECT.concat(project.id);

		var goalButton = [MS.genericButtonPostback(payloads.PBK_GOAL_OF_PROJECT, 'Ver')];
	    var executionButton = [MS.genericButtonPostback(payloads.PBK_PROJECT_EXECUTION, 'Ver')];
	    var CompareButton = [MS.genericButtonPostback(payloads.PBK_COMPARE_PROJECTS, 'Comparar')];
	    var moreButton = [MS.genericButtonLink(urlProject, 'Ir')];
	    var followButton = [MS.genericButtonPostback(payloads.PBK_FOLLOW_PROJECT, 'Ver')];

	    var elements = [
	    	MS.genericElements('Execução', 'Saiba como ficou a execução desse projeto', executionButton, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),
	    	//MS.genericElements('Comparar projeto', 'Compare andamento dos projetos', CompareButton, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),
	        MS.genericElements('Conhecer meta', 'Conhecer a meta na qual o projeto faz parte', goalButton, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),       
	        //MS.genericElements('Seguir projeto', 'Receba informações do andamento do projeto', followButton, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),
	        MS.genericElements('Conhecer melhor', 'Mais informações sobre esse projeto', moreButton, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),
	    ];

		var textMore = "Vou listar algumas opções para você tirar mais duvidas sobre esse projeto, é só clicar em Ver, que eu te falo.";
		sleep.sleepTextMessage(senderId, introductory_text, 1800);
		//Exibe cards com opções do projeto
		sleep.sleepGenericMenu(senderId, elements, 2200);
	},

	//Deixa o texto com o limite de caracteres possivel para enviar ao usuário (640 caracteres), e envia mensagem com descrição da meta ao usuário
	sendMessageDescriptionGoal(senderId, description) {
		console.log('responseMessenger.sendMessageDescriptionGoal...');
		if(description && description.length > 640) {
			var message = description.substring(0, 639);
			MS.textMessage(senderId, message);
		} else {
			MS.textMessage(senderId, description);
		}
	},

	responsePastManagementItensGoal(senderId, goal, introductory_text) {
		console.log('responseMessenger.responsePastManagementItensGoal...');

		var urlGoal = urls.URL_GOAL.concat(goal.goal_number);

		var button1 = [MS.genericButtonPostback(payloads.PBK_PROJECTS_OF_GOAL, 'Ver')];
	    var button2 = [MS.genericButtonPostback(payloads.PBK_GOAL_EXECUTION, 'Ver')];
	    var button3 = [MS.genericButtonPostback(payloads.PBK_GOAL_BUDGET, 'Ver')];
	    var button4 = [MS.genericButtonPostback(payloads.PBK_COMPARE_GOAL, 'Comparar')];
	    var button5 = [MS.genericButtonLink(urlGoal, 'Ir')];

	    var elements = [
	        MS.genericElements('Projetos desta metas', 'Conhecer os projetos dessa meta no distrito', button1, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),
	        MS.genericElements('Execução', 'Saiba como ficou a execução dessa meta', button2, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),
	        MS.genericElements('Orçamento', 'Veja o orçamento destinado para essa meta', button3, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),
		    MS.genericElements('Comparar metas', 'Compare essa meta', button4, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),
	        MS.genericElements('Mais sobre a meta', 'Mais informações sobre essa meta', button5, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),
	    ];

	    var textMore = "Vou listar algumas opções introductory_textpara você tirar mais duvidas sobre esse projeto, é só clicar em Ver, que eu te falo.";
		sleep.sleepTextMessage(senderId, introductory_text, 1800);
		//Exibe cards com opções do projeto
		sleep.sleepGenericMenu(senderId, elements, 2200);
	},

	optionsPastManagementGoal(senderId, goal, introductory_text) {
		console.log('responseMessenger.optionsPastManagementGoal...');
		var quickReplices = [
	        MS.genericQuicKRepliesText(payloads.PBK_PROJECTS_OF_GOAL, 'Projetos'),
	        MS.genericQuicKRepliesText(payloads.PBK_GOAL_EXECUTION, 'Execução'),
	        MS.genericQuicKRepliesText(payloads.PBK_GOAL_BUDGET, 'Orçamento'),
	        MS.genericQuicKRepliesText(payloads.PBK_COMPARE_GOAL, 'Comparar metas'),
	        MS.genericQuicKRepliesText(payloads.PBK_PAST_GOAL, 'Ver outra meta'),
	        MS.genericQuicKRepliesText(payloads.PBK_PAST_PROJECT, 'Conhecer projetos')
	    ];
	    sleep.sleepQuickReplices(senderId, quickReplices, introductory_text, 2200);
	},

	optionsPastManagementProject(senderId, project, introductory_text) {
		console.log('responseMessenger.optionsPastManagementProject...');
	    var quickReplices = [
	    	MS.genericQuicKRepliesText(payloads.PBK_PROJECT_EXECUTION, 'Execução'),
	    	MS.genericQuicKRepliesText(payloads.PBK_COMPARE_PROJECTS, 'Comparar projeto'),
	    	MS.genericQuicKRepliesText(payloads.PBK_GOAL_OF_PROJECT, 'Conhecer meta'),
	    	//MS.genericQuicKRepliesText(payloads.PBK_FOLLOW_PROJECT, 'Seguir projeto'),
	    	//MS.genericQuicKRepliesText(payloads.PBK_PROJECTS_OF_GOAL, 'Conhecer melhor'),
	    	MS.genericQuicKRepliesText(payloads.PBK_OTHER_PROJECT, 'Ver outro projeto'),
	    	MS.genericQuicKRepliesText(payloads.PBK_OTHER_GOAL, 'Conhecer metas')
	    ];
		sleep.sleepQuickReplices(senderId, quickReplices, introductory_text, 2200);
	},

}