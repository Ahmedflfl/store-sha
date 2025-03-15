// تحديد عناصر النموذج
const loginForm = document.querySelector('form');
const usernameInput = document.querySelector('input[name="username"]');
const passwordInput = document.querySelector('input[name="password"]');

// التعامل مع الحدث عند محاولة تسجيل الدخول
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // منع السلوك الافتراضي للنموذج

    // جلب القيم المدخلة
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // استرجاع البيانات المخزنة في localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // التحقق من وجود مستخدم بنفس البيانات
    const userFound = storedUsers.find(user => 
        user.name === enteredUsername && user.password === enteredPassword
    );

    if (userFound) {
        // إذا كان المستخدم موجودًا
        Swal.fire({
            icon: 'success',
            title: 'تم تسجيل الدخول بنجاح!',
            showConfirmButton: false,
            timer: 1500 // إغلاق التنبيه تلقائيًا بعد 1.5 ثانية
        });

        // عرض رسالة ترحيب باستخدام Toastify
        Toastify({
            text: `مرحبًا ${enteredUsername}!`,
            duration: 3000, // مدة ظهور الرسالة (3 ثوانٍ)
            close: true, // إظهار زر الإغلاق
            gravity: "top", // موقع الرسالة (أعلى الصفحة)
            position: "center", // محاذاة الرسالة (في المنتصف)
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // لون الخلفية
            stopOnFocus: true, // إيقاف الإغلاق التلقائي عند التركيز على الرسالة
        }).showToast();

        // توجيه المستخدم إلى الصفحة الرئيسية بعد 2 ثانية
        setTimeout(() => {
            window.location.href = './home.html';
        }, 2000);
    } else {
        // إذا كانت البيانات غير صحيحة
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
        });
    }

    // إعادة تعيين الحقول
    loginForm.reset();
});