document.addEventListener('DOMContentLoaded', () => {
         const form = document.querySelector('form');
         const priceModal = document.querySelector('#price-modal');
         const pageInput = document.querySelector('#page-count');
         const pptInput = document.querySelector('#ppt-count');
         const spacingInputs = document.querySelectorAll('input[name="order_spacing"]');
         const academicInputs = document.querySelectorAll('input[name="aclevel"]');
         const paperTypeSelect = document.querySelector('select[name="paper_type"]');
         const subjectSelect = document.querySelector('select[name="subject_area"]');
         const deadlineInput = document.querySelector('#deadline-input');
         const priceInput = document.querySelector('input[name="price"]');

         const updatePrice = () => {
             const pages = parseInt(pageInput.value) || 0;
             const slides = parseInt(pptInput.value) || 0;
             const spacing = Array.from(spacingInputs).find(input => input.checked)?.value.split('#')[0] || 1;
             const academic = Array.from(academicInputs).find(input => input.checked)?.value.split('#')[0] || 1;
             const paperType = paperTypeSelect.value.split('#')[0] || 1;
             const subject = subjectSelect.value.split('#')[0] || 1;
             const deadline = new Date(deadlineInput.value);
             const now = new Date();
             const hoursDiff = (deadline - now) / 36e5;
             const deadlineMultiplier = hoursDiff < 8 && hoursDiff > 0 ? 1.5 : 1;

             const pageCost = 8 * pages * academic * paperType * subject * spacing;
             const slideCost = 6 * slides * academic * paperType * subject;
             const total = (pageCost + slideCost) * deadlineMultiplier;

             priceModal.querySelector('p:nth-child(1)').innerHTML = `<strong>Pages:</strong> ${pages}`;
             priceModal.querySelector('p:nth-child(2)').innerHTML = `<strong>Spacing:</strong> ${spacing == 2 ? 'Single' : 'Double'}`;
             priceModal.querySelector('p:nth-child(3)').innerHTML = `<strong>PPT Slides:</strong> ${slides}`;
             priceModal.querySelector('p:nth-child(4)').innerHTML = `<strong>Level:</strong> ${Array.from(academicInputs).find(input => input.checked)?.value.split('#')[1] || 'College'}`;
             priceModal.querySelector('p:nth-child(5)').innerHTML = `<strong>Deadline:</strong> ${deadlineInput.value ? deadline.toLocaleString() : 'Not set'}`;
             priceModal.querySelector('h5 span').textContent = `$ ${total.toFixed(2)}`;
             priceInput.value = total.toFixed(2);
         };

         [pageInput, pptInput, ...spacingInputs, ...academicInputs, paperTypeSelect, subjectSelect, deadlineInput].forEach(input => {
             input.addEventListener('change', updatePrice);
         });

         updatePrice(); // Initial calculation
     });

document.querySelector('input[name="title"]').addEventListener('input', (e) => {
    document.querySelector('#title-counter').textContent = e.target.value.length;
});
document.querySelector('textarea[name="instructions"]').addEventListener('input', (e) => {
    document.querySelector('#instructions-counter').textContent = e.target.value.length;
});

document.querySelector('#page-plus').addEventListener('click', () => {
    pageInput.value = (parseInt(pageInput.value) || 0) + 1;
    updatePrice();
});
document.querySelector('#page-minus').addEventListener('click', () => {
    pageInput.value = Math.max(0, (parseInt(pageInput.value) || 0) - 1);
    updatePrice();
});
document.querySelector('#ppt-plus').addEventListener('click', () => {
    pptInput.value = (parseInt(pptInput.value) || 0) + 1;
    updatePrice();
});
document.querySelector('#ppt-minus').addEventListener('click', () => {
    pptInput.value = Math.max(0, (parseInt(pptInput.value) || 0) - 1);
    updatePrice();
});