const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'vwaofeoshpnacnpicind.supabase.co'
          },
          {
            protocol: 'http',  // http도 추가
            hostname: 'k.kakaocdn.net'
        },
          {
              protocol: 'https',
              hostname: 'k.kakaocdn.net'
          },
          {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com'
          }
      ]
  }
};

export default nextConfig;
