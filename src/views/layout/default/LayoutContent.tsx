import type { FunctionalComponent } from 'vue';
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import { RouterView, RouteLocation } from 'vue-router';

export default defineComponent({
  name: 'DefaultLayoutContent',
  setup() {
    return () => {
      return (
        <Layout.Content class="layout-content scrollbar">
          {() => (
            <RouterView>
              {({ Component, route }: { Component: FunctionalComponent; route: RouteLocation }) => {
                const renderComp = () => <Component key={route.fullPath} />;

                // const PageContent = <KeepAlive >{renderComp()}</KeepAlive>

                return renderComp();
              }}
            </RouterView>
          )}
        </Layout.Content>
      );
    };
  }
});
