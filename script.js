let currentClass = null;
let students = [];
let remainingStudents = [];
let isPicking = false;

function selectClass(classNumber) {
    currentClass = classNumber;
    document.getElementById('studentList').value = '';
    document.getElementById('pickButton').disabled = true;
    document.getElementById('result').textContent = '';
    
    // 로컬 스토리지에서 해당 반의 학생 목록 불러오기
    const savedStudents = localStorage.getItem(`class${classNumber}Students`);
    if (savedStudents) {
        document.getElementById('studentList').value = savedStudents;
        students = savedStudents.split(',').map(name => name.trim()).filter(name => name);
        remainingStudents = [...students];
        document.getElementById('pickButton').disabled = false;
    }
}

function saveStudents() {
    if (!currentClass) {
        alert('반을 먼저 선택해주세요!');
        return;
    }

    const input = document.getElementById('studentList').value;
    students = input.split(',').map(name => name.trim()).filter(name => name);
    
    if (students.length === 0) {
        alert('학생 이름을 입력해주세요!');
        return;
    }

    // 로컬 스토리지에 저장
    localStorage.setItem(`class${currentClass}Students`, input);
    remainingStudents = [...students];
    document.getElementById('pickButton').disabled = false;
    document.getElementById('result').textContent = '';
}

function pickStudent() {
    if (isPicking) return;
    if (remainingStudents.length === 0) {
        alert('모든 학생이 뽑혔습니다!');
        return;
    }

    isPicking = true;
    const cannonBall = document.querySelector('.cannon-ball');
    const result = document.getElementById('result');
    result.textContent = '';

    // 대포 발사 애니메이션
    cannonBall.classList.add('active');
    
    setTimeout(() => {
        // 랜덤으로 학생 선택
        const randomIndex = Math.floor(Math.random() * remainingStudents.length);
        const selectedStudent = remainingStudents[randomIndex];
        
        // 선택된 학생 제거
        remainingStudents.splice(randomIndex, 1);
        
        // 결과 표시
        result.textContent = selectedStudent;
        
        // 애니메이션 초기화
        cannonBall.classList.remove('active');
        isPicking = false;
    }, 1000);
} 