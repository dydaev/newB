<?php
namespace RomaChe\AuthBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use RomaChe\AuthBundle\Entity\Users;
use RomaChe\AuthBundle\Entity\Role;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadUserData implements  FixtureInterface, ContainerAwareInterface
{
    private $container;

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $role = new Role();
        $role->setName('ROLE_SUPER_USER');

        $manager->persist($role);

        $user = new Users();
        $user->setUsername('root');
        $user->setEmail('1122@i.ua');
        $user->setCountry('Ukraine');
        $user->setCity('Kyiv');
        $user->setAboutSelf('This prime super user');

        $user->getUserRoles()->add($role);

        $encoder = $this->container->get('security.password_encoder');
        $password = $encoder->encodePassword($user, '0000');
        $user->setPassword($password);

        $manager->persist($user);
        $manager->flush();

    }

    /**
     * Sets the container.
     *
     * @param ContainerInterface|null $container A ContainerInterface instance or null
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }
}
