import '../../../assets/styles/pages/landing.css';
import React from 'react';
import { Layout } from 'antd';

const { Header, Footer } = Layout;
 
export default function Landing() {
  return (
    <div>
      <Header>This is the header</Header>
      <h1>Landing</h1>
      <Footer>This is the footer</Footer>
    </div>
  );
}