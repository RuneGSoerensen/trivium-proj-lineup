"use client";

export default function EditQuestions({ formData, updateQuestion, removeQuestion, addQuestion, showQuestionsEdit, setShowQuestionsEdit }) {
  return (
    <div className="bg-default rounded-[24px] p-10 border-1 border-gray-300 mt-20 pb-20 flex flex-col">
      <div className="flex items-center justify-between">
        <label className="text-default font-semibold  my-16 mx-4 ">Questions</label>
        <button onClick={() => setShowQuestionsEdit((s) => !s)} className="text-muted mr-4">
          {showQuestionsEdit ? "Done" : "Edit"}
        </button>
      </div>
      <div className="space-y-6">
        {formData.questions.map((q, idx) => (
          <div key={idx} className="p-6 bg-default ">
            <div className="flex justify-between items-start gap-3">
              <input
                className="text-default font-semibold w-full"
                value={q.question}
                placeholder="Type question here"
                onChange={(e) => updateQuestion(idx, "question", e.target.value)}
              />
              {showQuestionsEdit && (
                <button onClick={() => removeQuestion(idx)} className="text-red-500 ml-2" aria-label={`Remove question ${idx + 1}`}>
                  Remove
                </button>
              )}
            </div>
            <div className="flex items-start gap-3 mt-3">
              <input
                className="text-default mb-4 leading-relaxed w-full"
                value={q.answer}
                placeholder="Type answer here"
                onChange={(e) => updateQuestion(idx, "answer", e.target.value)}
              />
              {showQuestionsEdit && <div className="w-24" />}
            </div>
            <hr className="border-gray-200" />
          </div>
        ))}
      </div>
      <button onClick={addQuestion} className="text-brand-primary p-16 self-center">+ Add Question</button>
    </div>
  );
}
