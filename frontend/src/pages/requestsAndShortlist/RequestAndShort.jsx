// import React, { useEffect, useState } from 'react';
// import { getShortlistedProfiles, getShortlistedByProfiles, getRequestsSentProfiles, getRequestsInProfiles } from '../../utils/requestAndShortApi';
// import styles from './requestAndShort.module.css';
// import UserNavbar from '../../components/navbar/UserNavbar';

// const RequestAndShort = () => {
//   const [shortlistedProfiles, setShortlistedProfiles] = useState([]);
//   const [shortlistedByProfiles, setShortlistedByProfiles] = useState([]);
//   const [requestsSentProfiles, setRequestsSentProfiles] = useState([]);
//   const [requestsInProfiles, setRequestsInProfiles] = useState([]);
//   const [activeSection, setActiveSection] = useState('shortlisted');

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const shortlisted = await getShortlistedProfiles();
//         setShortlistedProfiles(Array.isArray(shortlisted) ? shortlisted : []);

//         const shortlistedBy = await getShortlistedByProfiles();
//         console.log('shortlisted by 2',shortlistedBy);
//         setShortlistedByProfiles(Array.isArray(shortlistedBy) ? shortlistedBy : []);

//         const requestsSent = await getRequestsSentProfiles();
//         setRequestsSentProfiles(Array.isArray(requestsSent) ? requestsSent : []);

//         const requestsIn = await getRequestsInProfiles();
//         setRequestsInProfiles(Array.isArray(requestsIn) ? requestsIn : []);
//       } catch (error) {
//         console.error('Error fetching profiles:', error);
//       }
//     };

//     fetchProfiles();
//   }, []);

//   const handleProfileClick = (profile) => {
//     // Redirect to profile page or show profile details
//   };

//   const handleAcceptRequest = (profileId) => {
//     // Handle accept request
//   };

//   const handleRejectRequest = (profileId) => {
//     // Handle reject request
//   };

//   const renderProfile = (profile, isRequest = false) => (
//     <div className={styles.profileContainer} key={profile._id} onClick={() => handleProfileClick(profile)}>
//       <div className={styles.profileContent}>
//         <p>{profile.name}</p>
//         {isRequest && (
//           <div className={styles.buttons}>
//             <button onClick={(e) => { e.stopPropagation(); handleAcceptRequest(profile._id); }}>Accept</button>
//             <button onClick={(e) => { e.stopPropagation(); handleRejectRequest(profile._id); }}>Reject</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <UserNavbar />
//       <div className={styles.profileDisplayPage}>
//         <div className={styles.header}>
//           <button onClick={() => setActiveSection('shortlisted')} className={activeSection === 'shortlisted' ? styles.active : ''}>Shortlisted Profiles</button>
//           <button onClick={() => setActiveSection('shortlistedBy')} className={activeSection === 'shortlistedBy' ? styles.active : ''}>Profiles Shortlisted By</button>
//           <button onClick={() => setActiveSection('requestsSent')} className={activeSection === 'requestsSent' ? styles.active : ''}>Requests Sent Profiles</button>
//           <button onClick={() => setActiveSection('requestsIn')} className={activeSection === 'requestsIn' ? styles.active : ''}>Incoming Request Profiles</button>
//         </div>

//         <div className={styles.section}>
//           {activeSection === 'shortlisted' && (
//             <>
//               <h2>Shortlisted Profiles</h2>
//               {shortlistedProfiles.map(profile => renderProfile(profile))}
//             </>
//           )}
//           {activeSection === 'shortlistedBy' && (
//             <>
//               <h2>Profiles Shortlisted By</h2>
//               {shortlistedByProfiles.map(profile => renderProfile(profile))}
//             </>
//           )}
//           {activeSection === 'requestsSent' && (
//             <>
//               <h2>Requests Sent Profiles</h2>
//               {requestsSentProfiles.map(profile => renderProfile(profile, true))}
//             </>
//           )}
//           {activeSection === 'requestsIn' && (
//             <>
//               <h2>Incoming Request Profiles</h2>
//               {requestsInProfiles.map(profile => renderProfile(profile, true))}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default RequestAndShort;
