import { defineComponent } from 'vue';
// import { useFullContent } from '/@/hooks/web/useFullContent';
import { Layout } from 'ant-design-vue';
import LayoutHeader from './LayoutHeader';
import LayoutSider from './LayoutSider';
import LayoutContent from './LayoutContent';
import LayoutTabs from './LayoutTabs';

import './index.less';

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    // 获取项目配置
    // useFullContent();

    return () => {
      return (
        <Layout class="default-layout">
          {() => (
            <>
              <LayoutSider />
              <Layout>
                {() => (
                  <>
                    <LayoutHeader />
                    <LayoutTabs />
                    <LayoutContent />
                  </>
                )}
              </Layout>
            </>
          )}
        </Layout>
      );
    };
  }
});
