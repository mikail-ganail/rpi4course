import { JSX } from 'react';

function LoadingScreen(): JSX.Element {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f9f9f9' 
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e0e0e0',      
        borderTop: '4px solid #3b82f6',  
        borderRadius: '50%',             
        animation: 'spin 1s linear infinite',
        marginBottom: '16px'
      }}></div>
      
      <p style={{ 
        fontFamily: 'sans-serif', 
        fontSize: '18px', 
        color: '#555',
        margin: 0
      }}>
        Loading...
      </p>
    </div>
  );
}

export { LoadingScreen };
