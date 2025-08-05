import React from "react";
import { styles } from "../styles/styles";


const Policy = () => {
  return (
    <div>
      <div className={`w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3`}>
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms And Conditions
        </h1>
        {/* Privacy Policy */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">
            1. Privacy Policy
          </h2>
          <p className="text-[16px]  ml-[15px] whitespace-pre-line">
            We collect user data including names, emails, course progress, and
            payment information. This data helps us improve the platform and
            deliver content effectively. We use cookies and analytics tools to
            understand usage patterns. Your data is securely stored, and you
            have rights to access, edit, or delete your personal information.
          </p>
        </div>

        {/* Terms of Service */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">
            2. Terms of Service
          </h2>
          <p className="text-[16px]  ml-[15px] whitespace-pre-line">
            By using our platform, you agree to create an account, maintain its
            security, and follow community rules. Subscriptions and purchases
            are subject to specific pricing and refund terms. You may not share
            course content or engage in dishonest behavior. We reserve the right
            to suspend accounts that violate these terms.
          </p>
        </div>

        {/* Refund Policy */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">
            3. Refund Policy
          </h2>
          <p className="text-[16px] ml-[15px] whitespace-pre-line">
            Users may request a full refund within 7 days of purchase, provided
            that no more than 20% of the course has been completed. Refunds are
            not granted for downloadable content or dissatisfaction unless there
            is a technical issue on our side.
          </p>
        </div>

        {/* Honor Code */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">
            4. Honor Code
          </h2>
          <p className="text-[16px]  ml-[15px] whitespace-pre-line">
            We expect all learners to act with integrity. Plagiarism, copying
            answers, or cheating in any form is strictly prohibited. Violations
            may result in account suspension and revoked certificates.
          </p>
        </div>

        {/* Accessibility */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">
            5. Accessibility
          </h2>
          <p className="text-[16px]  ml-[15px] whitespace-pre-line">
            Our platform strives to be accessible to all learners. We follow
            WCAG 2.1 standards and support features such as screen readers and
            video captioning where available.
          </p>
        </div>

        {/* Community Guidelines */}
        <div className="mb-8">
          <h2 className="text-2xl  font-semibold text-blue-500 mb-2">
            6. Community Guidelines
          </h2>
          <p className="text-[16px]  ml-[15px] whitespace-pre-line">
            We encourage respectful communication and collaboration. No
            harassment, hate speech, spamming, or unrelated promotions are
            allowed.Let&apos;s build a safe and positive learning space together.
          </p>
        </div>

        {/* Copyright Policy */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">
            7. Copyright Policy
          </h2>
          <p className="text-[16px]  ml-[15px] whitespace-pre-line">
            All content on this platform is owned by us or our instructors. You
            may not download, reproduce, or redistribute any materials without
            explicit permission. If you believe your copyright is being
            violated, please contact us immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
