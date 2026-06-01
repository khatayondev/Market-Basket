import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { DatasetPage } from './components/DatasetPage';
import { PreprocessingPage } from './components/PreprocessingPage';
import { ExplorationPage } from './components/ExplorationPage';
import { AssociationPage } from './components/AssociationPage';
import { ClassificationPage } from './components/ClassificationPage';
import { ClusteringPage } from './components/ClusteringPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'dataset':
        return <DatasetPage />;
      case 'preprocess':
        return <PreprocessingPage />;
      case 'explore':
        return <ExplorationPage />;
      case 'association':
        return <AssociationPage />;
      case 'classify':
        return <ClassificationPage />;
      case 'cluster':
        return <ClusteringPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="size-full flex bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}