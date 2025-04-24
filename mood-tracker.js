document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('moodQuiz');
    const questions = document.querySelectorAll('.question-card');
    const progressBar = document.querySelector('.progress-bar');
    const resultSection = document.querySelector('.result-section');
    const finalScoreElement = document.getElementById('finalScore');
    const resultMessageElement = document.getElementById('resultMessage');
    const recommendationsList = document.getElementById('recommendations');
    const saveResultsBtn = document.getElementById('saveResults');

    let currentQuestion = 1;
    let answers = {};
    const totalQuestions = questions.length;

    // Update progress bar
    function updateProgress() {
        const progress = ((currentQuestion - 1) / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Show current question and hide others
    function showQuestion(questionNumber) {
        questions.forEach(question => {
            question.classList.remove('active');
            if (parseInt(question.dataset.question) === questionNumber) {
                question.classList.add('active');
            }
        });
    }

    // Handle option selection
    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', function() {
            const questionCard = this.closest('.question-card');
            const questionNumber = parseInt(questionCard.dataset.question);
            
            // Remove selected class from all options in current question
            questionCard.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store answer
            answers[questionNumber] = parseInt(this.dataset.value);
            
            // Move to next question or show results
            setTimeout(() => {
                if (questionNumber < totalQuestions) {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                    updateProgress();
                } else {
                    showResults();
                }
            }, 500);
        });
    });

    // Calculate and show results
    function showResults() {
        const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
        const averageScore = totalScore / totalQuestions;
        
        finalScoreElement.textContent = totalScore;
        
        // Set result message based on score
        let message = '';
        let recommendations = [];
        
        if (averageScore >= 4) {
            message = "You're doing great! Your overall well-being is in a good place.";
            recommendations = [
                "Continue your current self-care practices",
                "Consider sharing your positive strategies with others",
                "Maintain your healthy routines"
            ];
        } else if (averageScore >= 3) {
            message = "You're doing okay, but there's room for improvement.";
            recommendations = [
                "Try to get more quality sleep",
                "Incorporate some light exercise into your routine",
                "Practice mindfulness or meditation"
            ];
        } else if (averageScore >= 2) {
            message = "You might be going through a tough time. It's okay to seek support.";
            recommendations = [
                "Consider talking to a trusted friend or family member",
                "Try some relaxation techniques",
                "Make sure you're getting enough rest"
            ];
        } else {
            message = "It seems you're having a difficult time. Please consider reaching out for help.";
            recommendations = [
                "Contact a mental health professional",
                "Reach out to a trusted person in your life",
                "Consider calling a helpline for immediate support"
            ];
        }
        
        resultMessageElement.textContent = message;
        
        // Clear previous recommendations
        recommendationsList.innerHTML = '';
        
        // Add new recommendations
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });
        
        // Show results section
        resultSection.classList.add('active');
    }

    // Save results functionality
    saveResultsBtn.addEventListener('click', function() {
        // In a real application, this would save to a database
        const results = {
            date: new Date().toISOString(),
            answers: answers,
            totalScore: Object.values(answers).reduce((sum, value) => sum + value, 0)
        };
        
        // For now, we'll just show a success message
        alert('Your results have been saved!');
        
        // You could add code here to send the results to a server
        console.log('Results to be saved:', results);
    });
}); 