import { useTranslation } from 'react-i18next';
import { GlassPanel } from '@/components/common/GlassPanel';

export const AltairDemo = () => {
    const { t } = useTranslation();

    return (
        <GlassPanel>
            <h3 className="card-title" style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>
                {t('projects.items.altair.demo.title')}
            </h3>
        </GlassPanel>
    );
};
