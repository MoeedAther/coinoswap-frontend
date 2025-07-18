import React,{useEffect} from 'react'
import '../css/Privacy_Policy.css';
import '../css/Privacy_Policy_responsive.css';
import Bullet_Point_gold from '../images/Bullet Point Icon Gold.png';
import { Helmet } from 'react-helmet';

function Privacy_Policy() {        

    useEffect(()=>{
        window.scrollTo(0, 0);
    });

  return (
    <>
    <Helmet>
    <title>Privacy Policy | CoinoSwap – Secure Crypto Exchange Aggregator</title>
    <meta name="description" content="Review CoinoSwap’s Privacy Policy to understand how we protect your data on our non-custodial crypto exchange aggregator. Privacy is our priority." />
    </Helmet>
    {/*Privacy_policy_section start */}
    <div className="privacy_policy_section">
        <div className="continer-fluid policy_content">
            <h4 className='policy_heading'>Privacy and Cookie <strong className='policy_yellow'>Policy</strong></h4>
            <p className='policy_para'>At CoinoSwap, your privacy is paramount. This document outlines how we handle your personal information, the types of data we collect, and the methods we use to protect your privacy. By accessing our platform, you agree to the terms of this policy.</p>
            <div className="effective_date">
                <span><img src={Bullet_Point_gold} alt="" /></span>
                <span className='date_content policy_heading'>Effective Date: October 15, 2024</span>
            </div>
        </div>
    </div>
     {/*Privacy_policy_section end */}

      {/*policy_points_section start */}
      <section className="policy_points">
        <div className="container-fluid">
          {/*Point_1 section */}
          <div class="points_section">
          <h1 class="point1_heading policy_heading">1. Data We Collect</h1>
          <ul class="point_list">
              <span className='list_point'>To offer you the best service possible, we collect a minimal amount of information, which includes:</span>
              <li><strong>Transaction Data:</strong> Details such as wallet addresses, amounts swapped, and timestamps related to transactions.</li>
              <li><strong>Device Data:</strong> Information like IP addresses, browser type, and operating system, collected to enhance security and monitor performance.</li>
              <li><strong>Cookies and Tracking Tools:</strong> We use cookies to track user behavior on our platform. You can control the use of cookies via your browser settings, though disabling them may impact functionality.</li>
              <li><strong>Email Addresses (Optional):</strong> If you sign up for our newsletters or contact customer support, your email may be stored.</li>
              <span className='list_point'>We do not require or collect sensitive personal information like your name or social security number. Your anonymity is respected, especially for crypto-related activities.</span>
          </ul>
          </div>
          {/*Point_2 section */}
          <div class="points_section">
          <h1 class="point1_heading policy_heading">2. Use of Information</h1>
          <ul class="point_list">
              <span className='list_point'>We use the data we collect for the following reasons:</span>
              <li><strong>Facilitating Swaps:</strong> To ensure smooth processing of crypto transactions.</li>
              <li><strong>Optimizing Platform Performance:</strong> To improve our services, detect security threats, and troubleshoot issues.</li>
              <li><strong>Customer Support:</strong> If you choose to provide your contact details, we will use them solely for resolving your inquiries.
              </li>
              <li><strong>Optional Communications:</strong> If you opt in to receive updates from us, we may send newsletters or service-related emails. You may unsubscribe at any time.</li>
              <span className='list_point'>
              We will never sell your data to third parties. Your information is used only to improve your experience on our platform</span>
          </ul>
          </div>
          {/*Point_3 section */}
          <div class="points_section">
          <h1 class="point1_heading policy_heading">3. Data Security</h1>
          <ul class="point_list">
              <span className='list_point'>CoinoSwap prioritizes safeguarding your information. We employ advanced encryption and security protocols to ensure your data is protected:</span>
              <li><strong>Encryption: </strong>All transaction data is encrypted, preventing unauthorized access.</li>
              <li><strong>Audits: </strong>Regular audits are conducted to keep our security measures up to date.</li>
              <li><strong>Private Keys: </strong>We do not store, manage, or have access to your private keys, ensuring that your funds remain secure.</li>
          </ul>
          </div>
          {/*Point_4 section */}
          <div class="points_section">
          <h1 class="point1_heading policy_heading">4. Third-Party Links and Services</h1>
          <ul class="point_list">
              <span className='list_point'>We collaborate with third-party services to offer aggregated exchange rates from a variety of platforms. While we ensure these partners adhere to strict privacy and security standards,</span> <br />
              <span className='list_point'>we are not responsible for their privacy policies.</span>
              <li><strong>Exchange Integration:</strong> We connect users to multiple exchanges to provide the most competitive rates.</li>
              <li><strong>Analytics:</strong> Third-party analytics tools help us understand user behavior on our platform. These tools may collect usage data to help us improve.</li>
              <span className='list_point'>Users are encouraged to review the privacy policies of third-party services to understand how their information is managed by these external parties.</span>
          </ul>
          </div>
          {/*Point_5 section */}
          <div class="points_section">
          <h1 class="point1_heading policy_heading">5. Retention of Data</h1>
          <ul class="point_list">
              <span className='list_point'>We retain minimal data for the duration required to provide our services and comply with legal obligations.</span>
              <li><strong>Transaction and Device Data:</strong> Retained for security and auditing purposes. </li>
              <li><strong>Email Information:</strong> Retained until the user requests deletion or opts out of communications.</li>
              <span className='list_point'>We retain only the information necessary to maintain the functionality of our services, ensuring that unnecessary data is not stored.</span>
          </ul>
          </div>
          {/*Point_6 section */}
          <div class="points_section">
          <h1 class="point1_heading policy_heading">6. Your Rights</h1>
          <ul class="point_list">
              <span className='list_point'>You maintain control over your personal data and have the following rights:</span>
              <li><strong>Access Your Information:</strong> You can request a copy of any data we hold about you.</li>
              <li><strong>Delete Your Data:</strong> You may request the deletion of any optional personal data, such as your email address. 
              </li>
              <li><strong>Unsubscribe from Communications:</strong> You can opt out of receiving newsletters and promotional updates at any time. 
              </li>
              <span className='list_point'>We comply with applicable data protection regulations, such as GDPR, and ensure your rights are upheld.</span>
          </ul>
          </div>
          {/*Point_7 section */}
          <div class="points_section">
          <h1 class="point1_heading policy_heading">7. Children’s Privacy</h1>
          <ul class="point_list">
              <span className='list_point'>Our services are not designed for or directed at individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a </span> <br />
              <span className='list_point'>minor has provided personal information, we will delete it promptly.</span>
          </ul>
          </div>
          {/*Point_8 section */}
          <div class="points_section">
          <h1 class="point1_heading policy_heading">8. Cookie Policy</h1>
          <ul class="point_list">
              <span className='list_point'>We use cookies and similar technologies to offer a better user experience.</span> <br />
              <span className='list_point'><strong className='are_cookies'>What Are Cookies? </strong></span>
              <br />
              <span className='list_point'>Cookies are small data files stored on your device when you visit our site. They help us enhance your experience and improve site functionality.</span>
              <br />
              <span className='list_point'><strong className='are_cookies'>Types of Cookies We Use </strong></span>
              <li><strong>Essential Cookies:</strong> These are necessary for the platform to function correctly.</li>
              <li><strong>Performance Cookies:</strong> We use these to track user behavior and improve our platform’s functionality.</li>
              <li><strong>Custom Cookies:</strong> To provide personalized services, such as remembering your preferences, we may use functionality cookies. </li>
              <li><strong>Third-Party Cookies:</strong> External services, such as analytics providers, may use cookies to track interactions with our platform.</li>
              <span className='list_point'>Managing Cookies You can manage and block cookies through your browser settings. Note that some features of our platform may be limited if cookies are disabled.</span>
          </ul>
          </div>
          {/*Point_9 section */}
          <div class="points_section">
          <h1 class="point1_heading policy_heading">9. Policy Updates</h1>
          <ul class="point_list">
              <span className='list_point'>We reserve the right to update this policy periodically to reflect changes in our practices or legal obligations. The most current version will always be posted on this page.</span>
          </ul>
          </div>
          {/*Point_10 section */}
          <div class="points_section">
          <h1 class="point1_heading policy_heading">10. Contact Us</h1>
          <ul class="point_list">
              <span className='list_point'>If you have any questions about this Privacy and Cookie Policy, feel free to contact us:</span> <br />
              <span className='list_point'><strong className='are_cookies'>Coinoisseurs LLC </strong></span>
              <br />
              <span className='list_point'><strong className='are_cookies'>Doing Business As (DBA): CoinoSwap </strong></span>
              <br />
              <span className='list_point'>1309 Coffeen Avenue Suite 16200 Sheridan, Wyoming 82801 </span>
              <br />
              <span className='list_point'><strong>Email: </strong><a className='mail_to' href="mailto:support@coinoswap.com">Support@Coinoswap.Com</a></span>
             
          </ul>
          </div>
        </div>
      </section>
      {/*policy_points_section end */}
    </>
  )
}

export default Privacy_Policy