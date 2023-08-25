$(document).ready(function() {
    var quizData = [
        {
            question: "Вопрос 1",
            options: ["Ответ 1.1", "Ответ 1.2", "Ответ 1.3"],
            image: "image1.jpg"
        },
        {
            question: "Вопрос 2",
            options: ["Ответ 2.1", "Ответ 2.2", "Ответ 2.3"],
            image: "image2.jpg"
        },
        {
            question: "Вопрос 3",
            options: ["Ответ 3.1", "Ответ 3.2", "Ответ 3.3"],
            image: "image1.jpg"
        },
        {
            question: "Вопрос 4",
            options: ["Ответ 4.1", "Ответ 4.2", "Ответ 4.3"],
            image: "image2.jpg"
        },
        {
            question: "Вопрос 5",
            options: ["Ответ 5.1", "Ответ 5.2", "Ответ 5.3"],
            image: "image1.jpg"
        },
    ];

    var currentQuestion = 0;
    var userAnswers = [];

    function createQuizBlock(question, options, image) {
        var block = `
            <div class="quiz-block" data-question="${currentQuestion}">
                <h2>${question}</h2>
                <img src="img/${image}" alt="Image">
                <ul>
        `;

        options.forEach(function(option, index) {
            block += `
                <li>
                    <input type="radio" name="answer${currentQuestion}" value="${index}">
                    ${option}
                </li>
            `;
        });

        block += `
                </ul>
                <button class="prev-button">Назад</button>
                <button class="next-button">Далее</button>
            </div>
        `;

        return block;
    }

    function showQuestion(questionIndex) {
        $(".quiz-block").hide();
        $(".quiz-block[data-question='" + questionIndex + "']").show();

        $("#quiz").append(createQuizBlock(quizData[currentQuestion].question, quizData[currentQuestion].options, quizData[currentQuestion].image));
    }

    $("#quiz").on("click", ".prev-button", function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });

    $("#quiz").on("click", ".next-button", function() {
        var selectedOption = $("input[name='answer" + currentQuestion + "']:checked").val();
        if (selectedOption !== undefined) {
            userAnswers[currentQuestion] = parseInt(selectedOption);
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                showQuestion(currentQuestion);
            } else {
                showFinalForm();
            }
        }
    });

    function showFinalForm() {
        $("#quiz").empty().append(`
        <h2>Форма для отправки данных:</h2>
        <form id="quiz-form">
            <input type="text" name="fname" placeholder="Имя" required>
            <input type="text" name="lname" placeholder="Фамилия" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="tel" id="phone" name="phone" placeholder="Телефон" required>
            <input type="hidden" id="answers" name="answers" value='${JSON.stringify(userAnswers)}'>
            <button type="submit">Отправить</button>
        </form>
    `);

        $("#phone").mask("+9 (999) 999-9999");

        $("#phone").intlTelInput({
            initialCountry: "auto",
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js"
        });

        $("#quiz-form").validate({
            rules: {
                fname: {
                    required: true,
                    minlength: 3,
                    pattern: /^[A-Za-zА-Яа-я]+$/
                },
                lname: {
                    required: true,
                    minlength: 3,
                    pattern: /^[A-Za-zА-Яа-я]+$/
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                }
            },
            messages: {
                fname: {
                    required: "Введите ваше имя",
                    minlength: "Минимум 3 символа",
                    pattern: "Используйте только буквы"
                },
                lname: {
                    required: "Введите вашу фамилию",
                    minlength: "Минимум 3 символа",
                    pattern: "Используйте только буквы"
                },
                email: {
                    required: "Введите ваш email",
                    email: "Введите корректный email"
                },
                phone: {
                    required: "Введите ваш номер телефона"
                }
            },
            submitHandler: function(form) {
                $.ajax({
                    type: "POST",
                    url: "process-form.php",
                    data: $(form).serialize(),
                    success: function(response) {
                        alert("Данные успешно отправлены!");
                        form.reset();
                    }
                });
            }
        });
    }

    showQuestion(currentQuestion);
});